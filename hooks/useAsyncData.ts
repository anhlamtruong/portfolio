import { useState, useEffect } from "react";
import axios from "axios";

// Define a type for your data if you know the structure
// For example, if your data is an array of users:
// type DataType = { name: string; email: string; }[];

function useAsyncData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<T>(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, error };
}

export default useAsyncData;
