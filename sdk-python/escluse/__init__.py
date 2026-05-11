from dataclasses import dataclass
from typing import Optional

from .client import EscluseClient
from .exceptions import (
    EscluseError,
    EscluseApiError,
    EscluseAuthError,
    EscluseNotFoundError,
    EscluseValidationError,
    EscluseTimeoutError,
)

__version__ = "0.1.0"

__all__ = [
    "EscluseClient",
    "EscluseError",
    "EscluseApiError",
    "EscluseAuthError",
    "EscluseNotFoundError",
    "EscluseValidationError",
    "EscluseTimeoutError",
]