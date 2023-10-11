import styles from "./unitSelector.module.css";

export default function UnitSelector({ currUnit, onClick }) {
  const getClassName = (unit) =>
    currUnit === unit ? undefined : styles.inactive;

  return (
    <section className={styles.container}>
      <span className={getClassName("km")} onClick={() => onClick("km")}>
        в километрах
      </span>
      <span> | </span>
      <span className={getClassName("lunar")} onClick={() => onClick("lunar")}>
        в лунных орбитах
      </span>
    </section>
  );
}
