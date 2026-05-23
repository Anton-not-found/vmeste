import { LogoutButton } from "@/features/auth/logout/ui/LogoutButton";

export const metadata = {
  title: 'Главная | VmeSte',
  description: 'Найдите компанию для активностей',
};

export default function HomePage() {
  return (
    <div>
      <h1>Добро пожаловать в VmeSte!</h1>
      <p>Здесь будет список активностей...</p>
      
      {/* Временные кнопки для навигации (для теста) */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <a href="/register">Регистрация</a>
        <a href="/login">Вход</a>
        <a href="/api-doc">Swagger API</a>
         <LogoutButton />
      </div>
    </div>
  );
}