from typing import Dict, Any, Optional
from .base import BaseResource


class ServersResource(BaseResource):
    def list(
        self,
        page: int = 1,
        per_page: int = 20,
        status: Optional[str] = None,
        node_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        params = {"page": page, "per_page": per_page}
        if status:
            params["status"] = status
        if node_id:
            params["nodeId"] = node_id
        return self._request("GET", "/servers", params=params)

    def get(self, server_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/servers/{server_id}")

    def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("POST", "/servers", json=data)

    def update(self, server_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("PATCH", f"/servers/{server_id}", json=data)

    def delete(self, server_id: str) -> Dict[str, Any]:
        return self._request("DELETE", f"/servers/{server_id}")

    def start(self, server_id: str) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/actions", json={"action": "start"}
        )

    def stop(self, server_id: str) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/actions", json={"action": "stop"}
        )

    def restart(self, server_id: str) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/actions", json={"action": "restart"}
        )

    def kill(self, server_id: str) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/actions", json={"action": "kill"}
        )

    def reinstall(self, server_id: str) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/actions", json={"action": "reinstall"}
        )

    def stats(self, server_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/servers/{server_id}/stats")

    def logs(self, server_id: str, lines: int = 100) -> Dict[str, Any]:
        return self._request("GET", f"/servers/{server_id}/logs", params={"lines": lines})

    def command(self, server_id: str, command: str) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/command", json={"command": command}
        )

    def backups(self, server_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/servers/{server_id}/backups")

    def create_backup(self, server_id: str, name: Optional[str] = None) -> Dict[str, Any]:
        return self._request(
            "POST", f"/servers/{server_id}/backups", json={"name": name} if name else {}
        )

    def delete_backup(self, server_id: str, backup_id: str) -> Dict[str, Any]:
        return self._request("DELETE", f"/servers/{server_id}/backups/{backup_id}")