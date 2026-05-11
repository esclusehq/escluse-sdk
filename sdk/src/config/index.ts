export interface EscluseConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  debug?: boolean;
}

export const DEFAULT_CONFIG: Required<Omit<EscluseConfig, 'apiKey'>> = {
  baseUrl: 'https://api.esluce.com',
  timeout: 30000,
  debug: false,
};

export function resolveConfig(config: EscluseConfig): Required<EscluseConfig> {
  return {
    apiKey: config.apiKey,
    baseUrl: config.baseUrl ?? DEFAULT_CONFIG.baseUrl,
    timeout: config.timeout ?? DEFAULT_CONFIG.timeout,
    debug: config.debug ?? DEFAULT_CONFIG.debug,
  };
}