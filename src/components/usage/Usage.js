import React, { useEffect, useState } from "react";

const Usage = () => {
  const [fetchedData, setFetchedData] = useState("");
  const apiKey = process.env.REACT_APP_IMDB_KEY;

  const url = `https://imdb-api.com/API/Usage/${apiKey}`;

  // request ops for IMDB API
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  async function fetchData() {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
    setFetchedData(data);
  }

  // run the data fetch on load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>API calls left: {fetchedData.maximum - fetchedData.count}</h1>
    </div>
  );
};

export default Usage;
