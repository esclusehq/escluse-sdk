class EscluseError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class EscluseApiError(EscluseError):
    def __init__(self, status: int, message: str, endpoint: str = ""):
        self.status = status
        self.endpoint = endpoint
        super().__init__(f"[{status}] {message}")


class EscluseAuthError(EscluseError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message)


class EscluseNotFoundError(EscluseError):
    def __init__(self, resource: str, resource_id: str):
        super().__init__(f"{resource} with id '{resource_id}' not found")


class EscluseValidationError(EscluseError):
    def __init__(self, message: str, errors: Dict[str, list] = None):
        self.errors = errors or {}
        super().__init__(message)


class EscluseTimeoutError(EscluseError):
    def __init__(self, message: str = "Request timeout"):
        super().__init__(message)


from typing import Dict