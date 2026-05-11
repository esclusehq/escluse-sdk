import type { Timestamp, Status } from './common';

export type NodeStatus = 'online' | 'offline' | 'installing' | 'draining';

export interface Node extends Timestamp {
  id: string;
  name: string;
  address: string;
  port: number;
  scheme: 'https' | 'http';
  status: NodeStatus;
  location: string;
  description?: string;
  serversCount: number;
  memoryTotal: number;
  diskTotal: number;
}

export interface NodeStats {
  nodeId: string;
  cpu: number;
  memory: number;
  memoryTotal: number;
  disk: number;
  diskTotal: number;
  networkIn: number;
  networkOut: number;
  loadAverage: [number, number, number];
  uptime: number;
}

export interface NodeCreate {
  name: string;
  address: string;
  port: number;
  location: string;
  description?: string;
}

export interface Allocation {
  id: string;
  ip: string;
  port: number;
  isAssigned: boolean;
  serverId?: string;
}

export interface NodeAllocations {
  nodeId: string;
  allocations: Allocation[];
}