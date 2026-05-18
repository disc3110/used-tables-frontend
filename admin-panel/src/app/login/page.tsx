import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminToken } from "@/lib/auth";

export default async function LoginPage() {
  const token = await getAdminToken();

  if (token) {
    redirect("/");
  }

  return <LoginForm />;
}
