import { BaseResource } from './base';
import type {
  Subscription,
  PricingPlan,
  Invoice,
  ApiResponse,
} from '@escluse/types';

export class BillingResource extends BaseResource {
  async getSubscription(): Promise<ApiResponse<Subscription>> {
    return this.request<ApiResponse<Subscription>>('/billing/subscription');
  }

  async getPlans(): Promise<ApiResponse<PricingPlan[]>> {
    return this.request<ApiResponse<PricingPlan[]>>('/billing/plans');
  }

  async createCheckoutSession(planId: string): Promise<ApiResponse<{ url: string }>> {
    return this.request<ApiResponse<{ url: string }>>('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    });
  }

  async cancelSubscription(): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>('/billing/subscription', {
      method: 'DELETE',
    });
  }

  async reactivateSubscription(): Promise<ApiResponse<Subscription>> {
    return this.request<ApiResponse<Subscription>>('/billing/subscription/reactivate', {
      method: 'POST',
    });
  }

  async invoices(): Promise<ApiResponse<Invoice[]>> {
    return this.request<ApiResponse<Invoice[]>>('/billing/invoices');
  }

  async getInvoice(invoiceId: string): Promise<ApiResponse<Invoice>> {
    return this.request<ApiResponse<Invoice>>(`/billing/invoices/${invoiceId}`);
  }
}