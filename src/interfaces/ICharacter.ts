import IUrl from './common/IUrl';
import IExtendedObject from './common/IExtendedObject';

interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: IUrl[];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: IExtendedObject;
  stories: IExtendedObject;
  events: IExtendedObject;
  series: IExtendedObject;
}

export default ICharacter;
