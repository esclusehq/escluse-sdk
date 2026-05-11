from dataclasses import dataclass


@dataclass
class EscluseConfig:
    api_key: str
    base_url: str = "https://api.esluce.com"
    timeout: int = 30
    debug: bool = False