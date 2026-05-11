import type { EscluseConfig } from '../config';
import { resolveConfig } from '../config';
import type { WebSocketEvent, WebSocketMessage } from '@escluse/types';

type EventHandler = (data: unknown) => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private readonly config: Required<EscluseConfig>;
  private readonly listeners: Map<WebSocketEvent, Set<EventHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private shouldReconnect = true;

  constructor(config: EscluseConfig) {
    this.config = resolveConfig(config);
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const url = this.config.baseUrl.replace('http', 'ws') + '/api/v1/ws';
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.ws?.send(JSON.stringify({
        type: 'auth',
        token: this.config.apiKey,
      }));
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.emit(message.event, message.data);
      } catch {
        console.error('[Escluse WS] Failed to parse message:', event.data);
      }
    };

    this.ws.onerror = (error) => {
      console.error('[Escluse WS] Error:', error);
    };

    this.ws.onclose = () => {
      if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), this.reconnectDelay * this.reconnectAttempts);
      }
    };
  }

  disconnect(): void {
    this.shouldReconnect = false;
    this.ws?.close();
    this.ws = null;
    this.listeners.clear();
  }

  on(event: WebSocketEvent, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: WebSocketEvent, handler: EventHandler): void {
    this.listeners.get(event)?.delete(handler);
  }

  private emit(event: WebSocketEvent, data: unknown): void {
    this.listeners.get(event)?.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`[Escluse WS] Handler error for ${event}:`, error);
      }
    });
  }

  subscribeToServer(serverId: string): void {
    this.send({ type: 'subscribe', channel: 'server', id: serverId });
  }

  subscribeToNode(nodeId: string): void {
    this.send({ type: 'subscribe', channel: 'node', id: nodeId });
  }

  unsubscribeFromServer(serverId: string): void {
    this.send({ type: 'unsubscribe', channel: 'server', id: serverId });
  }

  private send(data: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}