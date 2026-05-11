import type { EscluseConfig } from './config';
import { ServersResource } from './resources/servers';
import { NodesResource } from './resources/nodes';
import { UsersResource } from './resources/users';
import { BillingResource } from './resources/billing';
import { WebSocketClient } from './websocket/client';

export default class EscluseClient {
  public readonly servers: ServersResource;
  public readonly nodes: NodesResource;
  public readonly users: UsersResource;
  public readonly billing: BillingResource;
  public readonly ws: WebSocketClient;

  constructor(config: EscluseConfig) {
    this.servers = new ServersResource(config);
    this.nodes = new NodesResource(config);
    this.users = new UsersResource(config);
    this.billing = new BillingResource(config);
    this.ws = new WebSocketClient(config);
  }

  destroy(): void {
    this.ws.disconnect();
  }
}

export * from './config';
export * from './resources';
export * from './websocket';
export * from './errors';
export * from '@escluse/types';