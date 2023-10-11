import styles from "./cart.module.css";
import { PulseLoader } from "react-spinners";

function declineAsteroidNoun(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "астероид";
  } else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  ) {
    return "астероида";
  } else {
    return "астероидов";
  }
}

export default function Cart({ itemsCount, submitting, onOrderBtnClick }) {
  return (
    <div className={styles.container}>
      <div>
        <h3>Корзина</h3>
        <p>
          {itemsCount} {declineAsteroidNoun(itemsCount)}
        </p>
      </div>
      <button
        disabled={submitting}
        onClick={onOrderBtnClick}
        className={styles.sendBtn}
      >
        {submitting ? (
          <PulseLoader
            color="white"
            size={6}
            cssOverride={{ margin: "auto" }}
          />
        ) : (
          "Отправить"
        )}
      </button>
    </div>
  );
}
