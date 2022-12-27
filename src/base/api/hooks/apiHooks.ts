import { useState, useEffect } from 'react';

interface Data {
  data: any;
  message: string;
}

interface Props {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
}

export default function useFetch({ url, method, body }: Props): 
{ data: Data | null, error: Error | null, loading: boolean } {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, loading };
}
