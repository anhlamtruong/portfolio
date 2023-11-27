import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function useAsyncDataFetcher<T>(url: string, fallbackData?: T) {
  const { data, error } = useSWR<T>(url, fetcher, { fallbackData });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useAsyncDataFetcher;
