"use client";
import List from "../../components/ListComponent";
import FeedItem from "../../components/FeedItemComponent";

export default function Home() {
  const isSSR = () => typeof window === "undefined";
  const dataArr =
    !isSSR() &&
    JSON.parse(window.sessionStorage.getItem("orderListData") || "[]");
  const unit =
    (!isSSR() && window.sessionStorage.getItem("orderListUnit")) || "km";

  return (
    <section>
      <h1>Заказ отправлен!</h1>
      <List>
        {!isSSR() &&
          dataArr.map((data) => (
            <FeedItem
              key={data.id}
              hasOrderBtn={false}
              data={data}
              unit={unit}
            />
          ))}
      </List>
    </section>
  );
}
