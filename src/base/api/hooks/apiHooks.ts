import React, {useState, useEffect,useCallback} from "react";


export const useGetQuery = <T,>(
  query: string,
  mapFunction: (rawData: any) => T
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // set loading to true to indicate that the data is being fetched
        
        const response = await fetch(query);
        const json = await response.json();
        
        setData(mapFunction(json)); // shape the data to our model
        
        setLoading(false); // set loading to false to indicate that the api call has ended
        
      } catch (error: any) {
        setError(error.message);
        setLoading(false); // set loading to false to indicate that the api call has ended
      }
    };
    fetchData();
  }, [mapFunction, query]);
  return { data, loading, error};
};

//reusable hook for post request

export const usePostQuery = <BodyData, ResponseData>(
    query: string,
    headers?: HeadersInit
  ): {
    post: (data: BodyData) => Promise<void>;
    loading: boolean;
    error: string | null;
    responseData: ResponseData | null;
  } => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const post = useCallback(
      async (data: BodyData) => {
        try {
          setLoading(true);
          const response = await fetch(query, {
            method: "POST",
            body: JSON.stringify(data),
            headers,
          });
          const json = await response.json();
  
          setResponseData(json);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
          setLoading(false);
        }
      },
      [headers, query]
    );
  
    return { responseData, loading, error, post };
  };

  