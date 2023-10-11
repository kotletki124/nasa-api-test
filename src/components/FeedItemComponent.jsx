import styles from "./feedItem.module.css";
import Link from "next/link";

function declineLunarOrbit(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "лунная орбита";
  } else if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20)
  ) {
    return "лунные орбиты";
  } else {
    return "лунных орбит";
  }
}

function processDistance(distance, unit) {
  if (unit === "km") return `${distance} км`;
  else return `${distance} ${declineLunarOrbit(distance)}`;
}

export default function FeedItem({
  hasOrderBtn,
  data,
  unit,
  onClick,
  isInCart,
}) {
  function handleAddToCartClick(e) {
    onClick(e, data.id);
  }

  return (
    <div className={styles.container}>
      <Link href={`/object/${data.id}`}>
        <h2>{data.date}</h2>
      </Link>
      <div className={styles.row1}>
        {processDistance(data.distance[unit], unit)}
        <div className={styles.img} />
        <div>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.size}>Ø {data.diameter} м</div>
        </div>
      </div>
      <div className={styles.row2}>
        {hasOrderBtn && (
          <button
            disabled={isInCart}
            className={styles.orderBtn}
            onClick={handleAddToCartClick}
          >
            {isInCart ? "В КОРЗИНЕ" : "ЗАКАЗАТЬ"}
          </button>
        )}
        <div className={styles.danger}>{data.hazardous && "⚠ Опасен"}</div>
      </div>
    </div>
  );
}
