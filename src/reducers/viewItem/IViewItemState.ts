import IGenericApiResponse from '../../interfaces/IGenericApiResponse';
import IComic from '../../interfaces/IComic';
import IStory from '../../interfaces/IStory';
import ICharacter from '../../interfaces/ICharacter';
/* eslint-disable */
interface IViewItemState {
  loading: boolean;
  error: string;
  data:
    | IGenericApiResponse<IStory>
    | IGenericApiResponse<ICharacter>
    | IGenericApiResponse<IComic>
    | null;
}

export default IViewItemState;
