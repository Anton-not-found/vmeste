import { LogoutButton } from "@/features/auth/logout/ui/LogoutButton";
import styles from "./layout.module.scss";
import { Flex } from "antd";
import Link from "antd/es/typography/Link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.mainLayout}>
      <header className={styles.mainHeader}>
        <span style={{ fontSize: 36 }}>VmeSte</span>
        <Flex align="center" gap={16}>
          <Link href="/api-doc">Swagger API</Link>
          <LogoutButton />
        </Flex>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.mainFooter}>
        <p>© 2026 VmeSte</p>
      </footer>
    </div>
  );
}
