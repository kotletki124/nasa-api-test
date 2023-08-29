import APIHelper from "../../../server/APIHelper";
import styles from "./page.module.css";
import List from "@/components/ListComponent";
import ObjectInfo from "@/components/ObjectInfoComponent";
import CloseApproachItem from "@/components/CloseApproachItemComponent";

export default async function Home({ params }) {
  const data = await APIHelper.getObject(params.id);
  return (
    <section>
      <ObjectInfo data={data} />
      <div className={styles.container}>
        <h1>Список всех сближений</h1>
        <List>
          {data.closeApproachData.map((cad) => (
            <CloseApproachItem key={cad.dateTimestamp} data={cad} />
          ))}
        </List>
      </div>
    </section>
  );
}
