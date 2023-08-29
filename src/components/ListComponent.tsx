import styles from "./list.module.css";

export default function List({ children }) {
  return (
    <section>
      <div className={styles.container}>{children}</div>
    </section>
  );
}
