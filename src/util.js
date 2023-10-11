import React from "react";

export function useDebounceWithThrottle(func, delay = 300, depsArr = []) {
  const throttledFunc = React.useMemo(
    () => debounceWithThrottle(func, delay),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [func, delay, ...depsArr]
  );
  return throttledFunc;
}

const debounceWithThrottle = (func, delay = 300) => {
  let lastExecutionTime = 0,
    timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    const currentTime = Date.now();
    if (currentTime - lastExecutionTime >= delay) {
      lastExecutionTime = currentTime;
      func(...args);
    } else {
      timeoutId = setTimeout(() => {
        lastExecutionTime = Date.now();
        func(...args);
      }, delay);
    }
    return { cancel: () => clearTimeout(timeoutId) };
  };
};
