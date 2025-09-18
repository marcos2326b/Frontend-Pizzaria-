"use client";

import { createContext, useState } from "react";
import { OrderContextData, OrderItemProps, OrderProviderProps } from "./@type";
import { api } from "@/services/api";
import { getCookieCliente } from "@/lib/cookieCliente";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRequestOpen(order_id: string) {
    const token = getCookieCliente();

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        order_id: order_id,
      },
    });

    setOrder(response.data);
    setIsopen(true);
  }

  function onRequestClose() {
    setIsopen(false);
  }

  async function finishOrder(order_id: string) {
    const token = getCookieCliente();

    const data = {
      order_id: order_id,
    };

    try {
      await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      toast.error("Falha ao finalizar o pedido");
      return;
    }

    toast.success("Pedido finalizado com sucesso");
    router.refresh();
    setIsopen(false);
  }

  return (
    <OrderContext.Provider
      value={{ isOpen, onRequestOpen, onRequestClose, order, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
