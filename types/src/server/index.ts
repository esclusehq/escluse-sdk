import type { Timestamp, Status } from './common';

export type ServerStatus = 'starting' | 'running' | 'stopping' | 'stopped' | 'error' | 'installing' | 'reinstalling';

export type GameType = 'minecraft' | 'minecraft-bedrock' | 'palworld' | 'rust' | 'valheim' | 'ark' | 'fivem' | 'custom';

export type ServerImage = 'paper' | 'fabric' | 'forge' | 'spigot' | 'vanilla' | 'purpur' | 'bukkit' | 'custom';

export interface ServerPort {
  name: string;
  port: number;
  type: 'game' | 'rcon' | 'query';
}

export interface Server extends Timestamp {
  id: string;
  name: string;
  nodeId: string;
  nodeName?: string;
  game: GameType;
  image: ServerImage;
  status: ServerStatus;
  ip: string;
  port: number;
  internalIp: string;
  ports: ServerPort[];
  memory: number;
  cpu: number;
  disk: number;
  swap: number;
  oomKiller: boolean;
  environment: Record<string, string>;
  startCommand?: string;
  domain?: string;
}

export interface ServerStats {
  serverId: string;
  cpu: number;
  memory: number;
  disk: number;
  networkIn: number;
  networkOut: number;
  uptime: number;
  playersOnline: number;
}

export interface ServerCreate {
  name: string;
  nodeId: string;
  game: GameType;
  image: ServerImage;
  memory: number;
  cpu: number;
  disk: number;
  environment?: Record<string, string>;
  startCommand?: string;
}

export interface ServerUpdate {
  name?: string;
  image?: ServerImage;
  memory?: number;
  cpu?: number;
  disk?: number;
  environment?: Record<string, string>;
  startCommand?: string;
}

export interface ServerAction {
  action: 'start' | 'stop' | 'restart' | 'kill' | 'reinstall';
}

export interface ServerBackup {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  isSuccessful: boolean;
  isLocked: boolean;
}