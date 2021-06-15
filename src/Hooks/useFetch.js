import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {
      signal: abortCont.signal,

      method: "GET",
      headers: {
        "x-rapidapi-key": "3b8ba7d032msh9616bf36969a1a2p1a7015jsn5184b59caa2b",
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("There seems to be an issue fetching data.");
        }
        return res.json();
      })
      .then((data) => {
        setError(null);
        setPending(false);
        setData(data);
        setMovies(data.ITEMS);
        setTotal(data.COUNT);
       
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Ftech aborted!");
        } else {
          setError(err.message);
          setPending(false);
        }
      });

    return () => abortCont.abort();
  }, [url]);
  return { data, pending, setPending, error, movies, total };
};

export default useFetch;
