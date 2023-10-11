"use client";
import styles from "./shop.module.css";
import { useReducer, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import UnitSelector from "./UnitSelectorComponent";
import List from "./ListComponent";
import FeedItem from "./FeedItemComponent";
import FeedItemSkeleton from "./FeedItemSkeletonComponent";
import Cart from "./CartComponent";
import { useDebounceWithThrottle } from "../util";
import { ClipLoader } from "react-spinners";
import settings from "../globalSettings";

function reducer(state, action) {
  const { value } = action.payload;
  switch (action.type) {
    case "setUnit":
      return { ...state, unit: value };
    case "setLoadingFeed":
      return { ...state, loadingFeed: value };
    case "addNewFeedChunk":
      return {
        ...state,
        feed: [...state.feed, ...value],
        loadingFeed: false,
      };
    case "addCartItem":
      return {
        ...state,
        cart: { ...state.cart, [value]: true },
        cartItemsCount: state.cartItemsCount + 1,
      };
    case "setSubmitting":
      return {
        ...state,
        submitting: value,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export default function Shop({ initialState, chunkInd }) {
  const [state, dispatch] = useReducer(reducer, {
    unit: "km",
    cart: {},
    cartItemsCount: 0,
    loadingFeed: false,
    submitting: false,
    ...initialState,
  });
  const currChunkInd = useRef(chunkInd);
  const router = useRouter();

  const throttledHandleWindowScroll = useDebounceWithThrottle(
    handleWindowScroll,
    300,
    [state.loadingFeed, state.submitting]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleWindowScroll);
    return () =>
      window.removeEventListener("scroll", throttledHandleWindowScroll);
  }, [throttledHandleWindowScroll]);

  function handleUnitClick(unit) {
    if (state.unit !== unit)
      dispatch({ type: "setUnit", payload: { value: unit } });
  }

  function handleAddToCartClick(e, id) {
    if (!state.cart[id])
      dispatch({ type: "addCartItem", payload: { value: id } });
  }

  async function handleWindowScroll() {
    if (
      !state.loadingFeed &&
      !state.submitting &&
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 500
    ) {
      dispatch({ type: "setLoadingFeed", payload: { value: true } });
      const response = await fetch(
        `/api/feed-chunk?index=${currChunkInd.current++}`
      );
      const newChunk = await response.json();
      dispatch({ type: "addNewFeedChunk", payload: { value: newChunk } });
    }
  }

  async function submitOrder(e) {
    if (state.cartItemsCount > 0 && !state.submitting) {
      dispatch({ type: "setSubmitting", payload: { value: true } });
      const idsArr = Object.keys(state.cart).filter((id) => state.cart[id]);
      let response = await fetch("api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(idsArr),
      });
      sessionStorage.setItem("orderListData", await response.text());
      sessionStorage.setItem("orderListUnit", state.unit);
      router.push("/checkout");
    }
  }

  return (
    <>
      <section className={state.submitting ? styles.submitting : ""}>
        <section className={styles.header}>
          <h1>Ближайшие подлёты астероидов</h1>
          <UnitSelector currUnit={state.unit} onClick={handleUnitClick} />
        </section>
        <List>
          {state.feed.map((data) => (
            <FeedItem
              key={data.id}
              hasOrderBtn
              data={data}
              unit={state.unit}
              onClick={handleAddToCartClick}
              isInCart={!!state.cart[data.id]}
            />
          ))}
          {state.loadingFeed && (
            <>
              <FeedItemSkeleton
                count={settings.feedChunkSize - 2}
                unit={state.unit}
              />
              <ClipLoader
                color="grey"
                size={30}
                cssOverride={{ margin: "auto" }}
              />
            </>
          )}
        </List>
      </section>
      <Cart
        itemsCount={state.cartItemsCount}
        submitting={state.submitting}
        onOrderBtnClick={submitOrder}
      />
    </>
  );
}
