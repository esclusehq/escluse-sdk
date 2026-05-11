import httpx
from typing import Optional, Dict, Any
from .config import EscluseConfig
from .resources.servers import ServersResource
from .resources.nodes import NodesResource
from .resources.users import UsersResource
from .resources.billing import BillingResource


class EscluseClient:
    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.esluce.com",
        timeout: int = 30,
    ):
        self.api_key = api_key
        self.base_url = base_url
        self._client = httpx.Client(
            base_url=base_url,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            timeout=timeout,
        )
        self._servers: Optional[ServersResource] = None
        self._nodes: Optional[NodesResource] = None
        self._users: Optional[UsersResource] = None
        self._billing: Optional[BillingResource] = None

    @property
    def servers(self) -> ServersResource:
        if self._servers is None:
            self._servers = ServersResource(self._client, self.base_url)
        return self._servers

    @property
    def nodes(self) -> NodesResource:
        if self._nodes is None:
            self._nodes = NodesResource(self._client, self.base_url)
        return self._nodes

    @property
    def users(self) -> UsersResource:
        if self._users is None:
            self._users = UsersResource(self._client, self.base_url)
        return self._users

    @property
    def billing(self) -> BillingResource:
        if self._billing is None:
            self._billing = BillingResource(self._client, self.base_url)
        return self._billing

    def close(self):
        self._client.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()