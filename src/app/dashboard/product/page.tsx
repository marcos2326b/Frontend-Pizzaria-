import { Form } from "./components/form";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function Product() {

  const token = await getCookieServer();

  const response = await api.get("/listcategory",{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });


  return <Form categories={response.data} />;
}
