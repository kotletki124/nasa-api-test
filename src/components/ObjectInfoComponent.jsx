import styles from "./objectInfo.module.css";

export default function ObjectInfo({ data }) {
  return (
    <div className={styles.container}>
      <h1>Сведения об астероиде {data.name}</h1>
      <dl className={styles.info}>
        <div className={styles.row}>
          <dt>Абс. звёздная величина:</dt>
          <dd>{data.h}</dd>
        </div>
        <div className={styles.row}>
          <dt>Диаметр:</dt>
          <dd>{data.diameter} м</dd>
        </div>
        <div className={styles.row}>
          <dt>Потенциальная опасность:</dt>
          <dd>{data.hazardous ? "Опасен" : "Неа"}</dd>
        </div>
        <div className={styles.row}>
          <dt>Ближайшее сближение:</dt>
          <dd>{data.date}</dd>
        </div>
      </dl>
    </div>
  );
}
