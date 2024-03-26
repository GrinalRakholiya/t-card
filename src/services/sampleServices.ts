import axios from 'axios';
import { SAMPLE_SERVICE_API } from '../utils/config.ts';

// ----------------------------- type --------------------------------------

export type CategoriesReponseDataType = {
  count: number;
  categories: string[];
};

type CategoriesReponseType = {
  config: Record<string, unknown>;
  data: CategoriesReponseDataType;
  headers: Record<string, unknown>;
  request: Record<string, unknown>;
  status: number;
  statusText: string;
};

type GetCategoriesFunction = () => Promise<CategoriesReponseDataType>;

// -------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: SAMPLE_SERVICE_API,
});

const getCategories: GetCategoriesFunction = async () => {
  const response: CategoriesReponseType = await axiosInstance.get('/categories');
  return response.data;
};

const SampleService = {
  getCategories,
};

export default SampleService;
