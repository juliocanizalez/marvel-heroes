import IExtendedObjectItem from './IExtendedObjectItem';

interface IExtendedObject {
  available: number;
  returned: number;
  collectionURI: string;
  items: IExtendedObjectItem[];
}

export default IExtendedObject;
