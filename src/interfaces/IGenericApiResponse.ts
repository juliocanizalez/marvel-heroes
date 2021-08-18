interface IGenericApiResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributtionText: string;
  attributtionHtml: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
  etag: string;
}

export default IGenericApiResponse;
