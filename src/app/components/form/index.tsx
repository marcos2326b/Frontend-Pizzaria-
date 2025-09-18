"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import styles from "@/app/page.module.scss";


interface FormClientProps {
  children: React.ReactNode;
  buttonText: string;
  onSubmit: (formData: FormData) => Promise<FormResult | void>; 
}

export function FormClient({ children, buttonText, onSubmit }: FormClientProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={async (formData: FormData) => {
        startTransition(async () => {
          const result = await onSubmit(formData);

          if (result?.status && result?.message) {
            toast[result.status](result.message);
          }
        });
      }}
    >
      {children}

      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "Carregando..." : buttonText}
      </button>
    </form>
  );
}
