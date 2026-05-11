from typing import Dict, Any
from .base import BaseResource


class NodesResource(BaseResource):
    def list(self) -> Dict[str, Any]:
        return self._request("GET", "/nodes")

    def get(self, node_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/nodes/{node_id}")

    def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("POST", "/nodes", json=data)

    def delete(self, node_id: str) -> Dict[str, Any]:
        return self._request("DELETE", f"/nodes/{node_id}")

    def stats(self, node_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/nodes/{node_id}/stats")

    def allocations(self, node_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/nodes/{node_id}/allocations")