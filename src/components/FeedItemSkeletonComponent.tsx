import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./feedItem.module.css";

export default function FeedItemSkeleton({ count = 1, unit = "km" }) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      {Array(count)
        .fill(1)
        .map((_, i) => (
          <div key={i} className={styles.container}>
            <h2>{<Skeleton width={135} />}</h2>
            <div className={styles.row1}>
              <Skeleton width={unit === "km" ? 100 : 140} />
              <Skeleton circle width={25} height={30} />
              <Skeleton width={70} height={32} />
            </div>
            <Skeleton width={90} height={20} borderRadius={16} />
          </div>
        ))}
    </SkeletonTheme>
  );
}
