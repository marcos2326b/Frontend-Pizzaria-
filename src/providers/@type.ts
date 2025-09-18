import { ReactNode } from "react";

export type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder:(order_id: string) => Promise<void>;
};

export type OrderProviderProps = {
  children: ReactNode;
};

export interface OrderItemProps {
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
  };
  order: {
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
  };
}
