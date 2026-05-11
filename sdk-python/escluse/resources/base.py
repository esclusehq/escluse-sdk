import httpx
from typing import Dict, Any


class BaseResource:
    def __init__(self, client: httpx.Client, base_url: str):
        self._client = client
        self._base_url = base_url
        self._api_base = f"{base_url}/api/v1"

    def _request(
        self,
        method: str,
        endpoint: str,
        **kwargs
    ) -> Dict[str, Any]:
        response = self._client.request(method, f"{self._api_base}{endpoint}", **kwargs)
        response.raise_for_status()
        return response.json()