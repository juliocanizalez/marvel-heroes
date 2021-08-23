import { useEffect, useRef, useState } from 'react';

import { get } from '../api/FetchInfo';

const useFetch = <T>(url: string) => {
  const isMounted = useRef(true);
  type Resp = {
    data: T | null;
    loading: boolean;
    error: string | null;
  };
  const [state, setState] = useState(<Resp>{
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    if (url) {
      get<T>(url)
        .then((data) => {
          if (isMounted.current) {
            setState((previusState) => ({
              ...previusState,
              error: null,
              loading: false,
              data,
            }));
          }
        })
        .catch(() => {
          setState({
            data: null,
            loading: false,
            error: 'Can not load info',
          });
        });
    }
  }, [url]);

  return state;
};

export default useFetch;
