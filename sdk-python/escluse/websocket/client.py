import json
import websockets
from typing import Callable, Dict, Any, Set


class WebSocketClient:
    def __init__(self, api_key: str, base_url: str = "wss://api.esluce.com"):
        self.api_key = api_key
        self.base_url = base_url
        self._ws = None
        self._listeners: Dict[str, Set[Callable]] = {}
        self._running = False

    async def connect(self):
        import websockets
        url = f"{self.base_url}/api/v1/ws"
        self._ws = await websockets.connect(url)
        await self._ws.send(json.dumps({"type": "auth", "token": self.api_key}))
        self._running = True

    async def listen(self):
        if not self._ws:
            raise RuntimeError("WebSocket not connected. Call connect() first.")

        while self._running:
            try:
                message = await self._ws.recv()
                data = json.loads(message)
                event = data.get("event")
                if event and event in self._listeners:
                    for handler in self._listeners[event]:
                        handler(data.get("data"))
            except websockets.exceptions.ConnectionClosed:
                break

    async def disconnect(self):
        self._running = False
        if self._ws:
            await self._ws.close()

    def on(self, event: str, handler: Callable):
        if event not in self._listeners:
            self._listeners[event] = set()
        self._listeners[event].add(handler)

    def off(self, event: str, handler: Callable):
        self._listeners[event].discard(handler)

    def subscribe_server(self, server_id: str):
        if self._ws:
            import asyncio
            asyncio.create_task(
                self._ws.send(json.dumps({
                    "type": "subscribe",
                    "channel": "server",
                    "id": server_id
                }))
            )