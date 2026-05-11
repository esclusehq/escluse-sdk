import { BaseResource } from './base';
import type {
  Server,
  ServerCreate,
  ServerUpdate,
  ServerAction,
  ServerStats,
  ServerBackup,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@escluse/types';

export class ServersResource extends BaseResource {
  async list(params?: PaginationParams & { status?: string; nodeId?: string }): Promise<PaginatedResponse<Server>> {
    const qs = this.buildQueryString(params);
    return this.request<PaginatedResponse<Server>>(`/servers${qs}`);
  }

  async get(serverId: string): Promise<ApiResponse<Server>> {
    return this.request<ApiResponse<Server>>(`/servers/${serverId}`);
  }

  async create(data: ServerCreate): Promise<ApiResponse<Server>> {
    return this.request<ApiResponse<Server>>('/servers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(serverId: string, data: ServerUpdate): Promise<ApiResponse<Server>> {
    return this.request<ApiResponse<Server>>(`/servers/${serverId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(serverId: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/servers/${serverId}`, {
      method: 'DELETE',
    });
  }

  async action(serverId: string, action: ServerAction): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/servers/${serverId}/actions`, {
      method: 'POST',
      body: JSON.stringify(action),
    });
  }

  async start(serverId: string): Promise<ApiResponse<void>> {
    return this.action(serverId, { action: 'start' });
  }

  async stop(serverId: string): Promise<ApiResponse<void>> {
    return this.action(serverId, { action: 'stop' });
  }

  async restart(serverId: string): Promise<ApiResponse<void>> {
    return this.action(serverId, { action: 'restart' });
  }

  async kill(serverId: string): Promise<ApiResponse<void>> {
    return this.action(serverId, { action: 'kill' });
  }

  async reinstall(serverId: string): Promise<ApiResponse<void>> {
    return this.action(serverId, { action: 'reinstall' });
  }

  async stats(serverId: string): Promise<ApiResponse<ServerStats>> {
    return this.request<ApiResponse<ServerStats>>(`/servers/${serverId}/stats`);
  }

  async logs(serverId: string, params?: { lines?: number; search?: string }): Promise<ApiResponse<string[]>> {
    const qs = this.buildQueryString(params);
    return this.request<ApiResponse<string[]>>(`/servers/${serverId}/logs${qs}`);
  }

  async command(serverId: string, command: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/servers/${serverId}/command`, {
      method: 'POST',
      body: JSON.stringify({ command }),
    });
  }

  async backups(serverId: string): Promise<ApiResponse<ServerBackup[]>> {
    return this.request<ApiResponse<ServerBackup[]>>(`/servers/${serverId}/backups`);
  }

  async createBackup(serverId: string, name?: string): Promise<ApiResponse<ServerBackup>> {
    return this.request<ApiResponse<ServerBackup>>(`/servers/${serverId}/backups`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async deleteBackup(serverId: string, backupId: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/servers/${serverId}/backups/${backupId}`, {
      method: 'DELETE',
    });
  }
}