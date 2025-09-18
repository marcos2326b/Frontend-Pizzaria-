import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FormClient } from "./components/form";
import { PasswordInput } from "./components/inputPassword";


export default function Home() {
  async function handleLogin(formData: FormData): Promise<FormResult | void> {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { status: "warning", message: "Preencha todos os campos" };
    }

    try {
      const response = await api.post("/session", { email, password });
      const cookieStore = await cookies();
      const expressTime = 24 * 60 * 60;

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    } catch {
      return { status: "error", message: "Email ou senha inválidos" };
    }

    redirect("/dashboard");
  }

  return (
    <div className={styles.containerCenter}>
      <h1 className={styles.title}>Pizzaria Botafogo</h1>
      <Image src={logoImg} alt="Logo" width={200} height={200} />

      <section className={styles.login}>
        <FormClient buttonText="Acessar" onSubmit={handleLogin}>
          <input
            type="email"
            required
            name="email"
            placeholder="Digite seu email"
            className={styles.input}
          />

          <PasswordInput />
        </FormClient>

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se!
        </Link>
      </section>
    </div>
  );
}
