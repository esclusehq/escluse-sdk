import { BaseResource } from './base';
import type {
  Node,
  NodeCreate,
  NodeStats,
  Allocation,
  ApiResponse,
} from '@escluse/types';

export class NodesResource extends BaseResource {
  async list(): Promise<ApiResponse<Node[]>> {
    return this.request<ApiResponse<Node[]>>('/nodes');
  }

  async get(nodeId: string): Promise<ApiResponse<Node>> {
    return this.request<ApiResponse<Node>>(`/nodes/${nodeId}`);
  }

  async create(data: NodeCreate): Promise<ApiResponse<Node>> {
    return this.request<ApiResponse<Node>>('/nodes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async delete(nodeId: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/nodes/${nodeId}`, {
      method: 'DELETE',
    });
  }

  async stats(nodeId: string): Promise<ApiResponse<NodeStats>> {
    return this.request<ApiResponse<NodeStats>>(`/nodes/${nodeId}/stats`);
  }

  async allocations(nodeId: string): Promise<ApiResponse<Allocation[]>> {
    return this.request<ApiResponse<Allocation[]>>(`/nodes/${nodeId}/allocations`);
  }
}