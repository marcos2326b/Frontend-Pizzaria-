"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { getCookieCliente } from "@/lib/cookieCliente";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { applyPriceMask } from "@/lib/utils";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [price, setPrice] = useState(""); // estado para o input de preço

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const description = formData.get("description");

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("price", price); // envia o preço já formatado
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = getCookieCliente();

    try {
      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Produto registrado com sucesso");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao cadastrar o produto");
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/png" && image.type !== "image/jpeg") {
        toast.warning("Formato não permitido");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    const masked = applyPriceMask(e.target.value);
    setPrice(masked);
  }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Preço do produto"
          required
          className={styles.input}
          value={price} // controla o input
          onChange={handlePriceChange} // aplica a máscara
        />

        <textarea
          name="description"
          placeholder="Digite a descrição do produto"
          required
          className={styles.input}
        ></textarea>

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
