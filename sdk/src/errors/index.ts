export class EscluseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EscluseError';
  }
}

export class EscluseApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly endpoint?: string
  ) {
    super(message);
    this.name = 'EscluseApiError';
  }
}

export class EscluseAuthError extends EscluseError {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'EscluseAuthError';
  }
}

export class EscluseNotFoundError extends EscluseError {
  constructor(resource: string, id: string) {
    super(`${resource} with id "${id}" not found`);
    this.name = 'EscluseNotFoundError';
  }
}

export class EscluseValidationError extends EscluseError {
  constructor(
    message: string,
    public readonly errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'EscluseValidationError';
  }
}

export class EscluseWebSocketError extends EscluseError {
  constructor(message: string) {
    super(message);
    this.name = 'EscluseWebSocketError';
  }
}