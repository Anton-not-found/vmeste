import { RegisterForm } from '@/features/auth/register/ui/RegisterForm';
import styles from './styles.module.scss';

export const metadata = {
  title: 'Регистрация | VmeSte',
  description: 'Создайте аккаунт в VmeSte',
};

export default function RegisterPage() {
  return (
     <>
      <div className={styles.hero}>
        <div className={styles.heroEmoji}>🌟</div>
      </div>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>✨ ДОБРО ПОЖАЛОВАТЬ В VMESTE</h1>
        <p className={styles.subtitle}>
          Готовы открывать активности вместе с новыми людьми?<br />
          Займёт 20 секунд.
        </p>
        <RegisterForm />
        <p className={styles.footer}>
          Уже с нами? <a href="/login" className={styles.link}>Войти</a>
        </p>
      </div>
    </>
  );
}