"use client";

import { use } from "react";
import { Props } from "./@types";
import styles from "./styles.module.scss";
import { RefreshCcw } from "lucide-react";
import { ModalOrder } from "@/app/dashboard/components/modal";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Orders({ orders }: Props) {
  const router = useRouter();
  const { isOpen, onRequestOpen } = use(OrderContext);

  async function handleDetailOrder(order_id:string) {
    await onRequestOpen(order_id)
  }

  function handleRefresh(){
    router.refresh();
    toast.success("Pedidos atualizados com sucesso")
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <RefreshCcw size={24} color="#3fffa3" onClick={handleRefresh} />
          </button>
        </section>

        <section className={styles.listOrders}>
          
          {orders.length === 0 && (
            <span  className={styles.emptyItem}>
              Nenhum pedido aberto no momento
            </span>
          )}

          {orders.map((order) => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={() => handleDetailOrder(order.id)}
            >
              <div className={styles.tag}></div>
              <span>{order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
