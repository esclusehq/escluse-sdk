from typing import Dict, Any
from .base import BaseResource


class UsersResource(BaseResource):
    def me(self) -> Dict[str, Any]:
        return self._request("GET", "/users/me")

    def update_profile(self, data: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("PATCH", "/users/me", json=data)

    def api_keys(self) -> Dict[str, Any]:
        return self._request("GET", "/users/me/keys")

    def create_api_key(self, name: str) -> Dict[str, Any]:
        return self._request("POST", "/users/me/keys", json={"name": name})

    def delete_api_key(self, key_id: str) -> Dict[str, Any]:
        return self._request("DELETE", f"/users/me/keys/{key_id}")