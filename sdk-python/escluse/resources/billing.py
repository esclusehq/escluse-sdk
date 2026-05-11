from typing import Dict, Any
from .base import BaseResource


class BillingResource(BaseResource):
    def get_subscription(self) -> Dict[str, Any]:
        return self._request("GET", "/billing/subscription")

    def get_plans(self) -> Dict[str, Any]:
        return self._request("GET", "/billing/plans")

    def create_checkout_session(self, plan_id: str) -> Dict[str, Any]:
        return self._request("POST", "/billing/checkout", json={"planId": plan_id})

    def cancel_subscription(self) -> Dict[str, Any]:
        return self._request("DELETE", "/billing/subscription")

    def reactivate_subscription(self) -> Dict[str, Any]:
        return self._request("POST", "/billing/subscription/reactivate")

    def invoices(self) -> Dict[str, Any]:
        return self._request("GET", "/billing/invoices")

    def get_invoice(self, invoice_id: str) -> Dict[str, Any]:
        return self._request("GET", f"/billing/invoices/{invoice_id}")