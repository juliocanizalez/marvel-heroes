import IUrl from './common/IUrl';
import IExtendedObject from './common/IExtendedObject';
import IExtendedObjectItem from './common/IExtendedObjectItem';

interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: IUrl[];
  series: IExtendedObjectItem;
  variants: IExtendedObjectItem[];
  collections: IExtendedObjectItem[];
  collectedIssues: IExtendedObjectItem[];
  dates: {
    type: string;
    date: Date;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
  creators: IExtendedObject;
  characters: IExtendedObject;
  stories: IExtendedObject;
  events: IExtendedObject;
}

export default IComic;
