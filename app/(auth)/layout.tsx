import { Flex } from "@/shared/components/common";
import styles from "./layout.module.scss"


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <Flex className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>VmeSte</h1>
          <p className={styles.subtitle}>
            Находите компанию для<br />любых активностей
          </p>
        </div>
      </div>
      {/* <div className={styles.formWrapper}>{children}</div> */}
      <Flex justify="center" align="center" className={styles.formWrapper}>{children}</Flex>
    </Flex>
  );
}
