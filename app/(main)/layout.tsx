export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout">
      {/* Здесь позже добавим Header, Sidebar, Footer */}
      <header className="main-header">
        <h1>VmeSte</h1>
        {/* Навигация, аватар пользователя и т.д. */}
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="main-footer">
        <p>© 2026 VmeSte</p>
      </footer>
    </div>
  );
}