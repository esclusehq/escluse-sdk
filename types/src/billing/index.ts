export type SubscriptionPlan = 'hobby' | 'pro' | 'business';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing' | 'expired';

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  serversLimit: number;
  serversUsed: number;
  nodesLimit: number;
  nodesUsed: number;
  price: number;
  currency: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  plan: SubscriptionPlan;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    servers: number;
    nodes: number;
    memoryPerServer: number;
    diskPerServer: number;
  };
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  description: string;
  paidAt?: string;
  createdAt: string;
  url: string;
}

export interface WebhookEvent {
  id: string;
  type: 'subscription.created' | 'subscription.updated' | 'subscription.cancelled' | 'subscription.renewed' | 'invoice.paid' | 'invoice.failed';
  data: Record<string, unknown>;
  createdAt: string;
}