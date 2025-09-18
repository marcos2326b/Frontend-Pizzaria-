import { OrderItemProps } from "@/providers/@type";

export function calculateTotalOrder(orders: OrderItemProps[]) {
  return orders.reduce((total, item) => {
    const itemTotal = parsePrice(item.product.price) * item.amount;
    return total + itemTotal;
  }, 0);
}

export function parsePrice(value: string): number {
  if (!value) return 0;

  let normalized = value.replace(/\./g, "");
  normalized = normalized.replace(",", ".");
  
  return parseFloat(normalized);
}

