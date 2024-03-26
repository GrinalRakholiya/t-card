import SampleServices, { CategoriesReponseDataType } from '../../services/sampleServices.ts';

import { dispatch } from '../store.ts';
import { getCategoriesSuccess, setError, setLoading } from '../slices/categoriesSlice.ts';

type ActionFunctionType = () => Promise<void>;

export const getCategoriesAction: ActionFunctionType = async () => {
  dispatch(setLoading(true));
  try {
    const data: CategoriesReponseDataType = await SampleServices.getCategories();
    dispatch(getCategoriesSuccess(data));
  } catch (error) {
    dispatch(setError(error));
  }
};
