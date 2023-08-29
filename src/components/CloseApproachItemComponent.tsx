import styles from "./closeApproachItem.module.css";

const translations = {
  Mercury: "Меркурий",
  Venus: "Венера",
  Earth: "Земля",
  Mars: "Марс",
  Jupiter: "Юпитер",
  Saturn: "Сатурн",
  Uranus: "Уран",
  Neptune: "Нептун",
};

export default function CloseApproachItem({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2>{data.date}</h2>
        <span>{data.time || "3:14"}</span>
      </div>
      <div className={styles.row}>
        <div>{data.distance} км</div>
        <div>{data.velocity} км/ч</div>
      </div>
      <div>{translations[data.orbitingBody]}</div>
    </div>
  );
}
