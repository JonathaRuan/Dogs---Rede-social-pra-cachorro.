import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    console.log();

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      // Coloquei o await no response.json para dar o tempo necessario para a resposta se transformar em json.
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (error) {
      json(null);
      setError(error.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
