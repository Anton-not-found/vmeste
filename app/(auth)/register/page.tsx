import { RegisterForm } from "@/features/auth/register/ui/RegisterForm";

export const metadata = {
  title: "Регистрация | VmeSte",
  description: "Создайте аккаунт в VmeSte",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
