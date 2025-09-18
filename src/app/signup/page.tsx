import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "/public/logo.svg";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { PasswordInput } from "../components/inputPassword";
import { FormClient } from "../components/form";

export default function Signup() {
  async function handleRegister(formData: FormData): Promise<FormResult | void> {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name === "" || email === "" || password === "") {
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (err) {
      return { status: "error", message: "Erro ao cadastrar usuário" };
    }
   
    redirect("/");
    
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <h1 className={styles.title}>Pizzaria Botafogo</h1>
        <Image src={logoImg} alt="Logo da pizzaria" width={200} height={200} />

        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <FormClient buttonText="Cadastrar" onSubmit={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome"
              className={styles.input}
            />

            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            />

            <PasswordInput />
          </FormClient>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
    </>
  );
}
