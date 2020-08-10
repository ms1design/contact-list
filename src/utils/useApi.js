import { useState, useEffect, useCallback } from 'react';

const noop = () => {};

export default function useApi({
  apiCallFn = noop,
  dependencies = [],
} = {}) {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [error, setError] = useState(null);

  const fetchMore = useCallback(async () => {
    try {
      setLoading(true);
      const nextPage = await apiCallFn();
      if (nextPage.length === 0) {
        setIsAtEnd(true);
      } else {
        setFetchedData([...fetchedData, ...nextPage]);
      }
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apiCallFn, fetchedData]);

  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { fetchedData, isLoading, isAtEnd, error, fetchMore };
}
