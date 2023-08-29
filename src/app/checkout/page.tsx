"use client";
import List from "../../components/ListComponent";
import ListItem from "../../components/FeedItemComponent";

export default function Home() {
  const dataArr = JSON.parse(sessionStorage.getItem("orderListData") || "[]"),
    unit = sessionStorage.getItem("orderListUnit") || "km";

  return (
    <section>
      <h1>Заказ отправлен!</h1>
      <List>
        {dataArr.map((data) => (
          <ListItem key={data.id} hasOrderBtn={false} data={data} unit={unit} />
        ))}
      </List>
    </section>
  );
}
