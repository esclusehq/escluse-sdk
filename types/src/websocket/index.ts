export type WebSocketEvent =
  | 'server.log'
  | 'server.status'
  | 'server.stats'
  | 'server.install_completed'
  | 'server.install_failed'
  | 'server.embed_url'
  | 'node.stats'
  | 'node.status'
  | 'auth.success'
  | 'error';

export interface WebSocketMessage<T = unknown> {
  event: WebSocketEvent;
  data: T;
  timestamp: string;
}

export interface ServerLog {
  serverId: string;
  message: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  timestamp: string;
}

export interface ServerStatusEvent {
  serverId: string;
  status: string;
  previousStatus?: string;
}

export interface ServerStatsEvent {
  serverId: string;
  stats: {
    cpu: number;
    memory: number;
    players: number;
  };
}

export interface NodeStatsEvent {
  nodeId: string;
  stats: {
    cpu: number;
    memory: number;
    memoryTotal: number;
    disk: number;
    diskTotal: number;
  };
}

export interface EmbedUrlEvent {
  serverId: string;
  url: string;
  expiresAt: string;
}