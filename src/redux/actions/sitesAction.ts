import { dispatch } from '../store.ts';
import { SitesInterface } from '../../pages/sites/type.ts';
import sitesServices from '../../services/sitesServices.ts';
import {
  addSitesSucess,
  deleteSitesSuccess,
  editSitesSuccess,
  getSitesSucess,
  setError,
  setLoading,
} from '../slices/sitesSlice.ts';

export const getSitesAction = async (page?: number, limit?: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await sitesServices.getSite(page, limit);
    dispatch(getSitesSucess(responseData));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const addSitesAction = async (data: SitesInterface, page: number, limit: number): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await sitesServices.addSite(data);
    dispatch(addSitesSucess(responseData));
    getSitesAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const editSitesAction = async (
  id: string | undefined,
  data: SitesInterface,
  page: number,
  limit: number
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await sitesServices.editSite(id, data);
    dispatch(editSitesSuccess(responseData));
    getSitesAction(page, limit);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const deleteSitesAction = async (id: string | undefined, page: number, limit: number): Promise<void> => {
  if (id === undefined) {
    console.error('id is undefined');
    return;
  }

  dispatch(setLoading(true));
  try {
    const responseData = await sitesServices.deleteSite(id);
    dispatch(deleteSitesSuccess(responseData));
    getSitesAction(page, limit);
  } catch (error) {
    let sitesError;
    if (error.error.code === '23503') {
      sitesError = new Error('This site is already in use.');
    } else {
      sitesError = new Error('Something went wrong!');
    }
    dispatch(setError(sitesError));
  }
};
