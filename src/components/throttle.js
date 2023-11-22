import { useEffect, useState } from "react";

export function useThrottle(query) {
  const [throttle, setThrottle] = useState();

  useEffect(() => {
    if (query) {
      fetch(`https://api.npms.io/v2/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setThrottle(data.results);
          }, 400);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  return throttle;
}
