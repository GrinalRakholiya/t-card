import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoryReducer from './slices/categoriesSlice.ts';
import usersReducer from './slices/usersSlice.ts';
import liveStatusReducer from './slices/liveStatusSlice.ts';
import authReducer from './slices/authSlice.ts';
import rolesReducer from './slices/rolesSlice.ts';
import qrcodeReducer from './slices/qrcodeSlice.ts';
import departmentReducer from './slices/departmentSlice.ts';
import sitesReducer from './slices/sitesSlice.ts';
import vehiclesReducer from './slices/vehiclesSlice.ts';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  categories: categoryReducer,
  roles: rolesReducer,
  users: usersReducer,
  liveStatus: liveStatusReducer,
  department: departmentReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  qrcode: qrcodeReducer,
  sites: sitesReducer,
  vehicles: vehiclesReducer,
});

export { rootPersistConfig, rootReducer };
