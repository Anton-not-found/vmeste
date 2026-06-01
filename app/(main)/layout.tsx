import styles from "./layout.module.scss";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.mainLayout}>
      {/* Здесь позже добавим Header, Sidebar, Footer */}
      <header className={styles.mainHeader}>
        <span style={{ fontSize: 36 }}>VmeSte</span>
        {/* Навигация, аватар пользователя и т.д. */}
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.mainFooter}>
        <p>© 2026 VmeSte</p>
      </footer>
    </div>
  );
}
