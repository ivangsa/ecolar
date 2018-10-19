import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAccountCategories, defaultValue } from 'app/shared/model/account-categories.model';

export const ACTION_TYPES = {
  FETCH_ACCOUNTCATEGORIES_LIST: 'accountCategories/FETCH_ACCOUNTCATEGORIES_LIST',
  FETCH_ACCOUNTCATEGORIES: 'accountCategories/FETCH_ACCOUNTCATEGORIES',
  CREATE_ACCOUNTCATEGORIES: 'accountCategories/CREATE_ACCOUNTCATEGORIES',
  UPDATE_ACCOUNTCATEGORIES: 'accountCategories/UPDATE_ACCOUNTCATEGORIES',
  DELETE_ACCOUNTCATEGORIES: 'accountCategories/DELETE_ACCOUNTCATEGORIES',
  RESET: 'accountCategories/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAccountCategories>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AccountCategoriesState = Readonly<typeof initialState>;

// Reducer

export default (state: AccountCategoriesState = initialState, action): AccountCategoriesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTCATEGORIES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTCATEGORIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNTCATEGORIES):
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNTCATEGORIES):
    case REQUEST(ACTION_TYPES.DELETE_ACCOUNTCATEGORIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTCATEGORIES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTCATEGORIES):
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNTCATEGORIES):
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNTCATEGORIES):
    case FAILURE(ACTION_TYPES.DELETE_ACCOUNTCATEGORIES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTCATEGORIES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTCATEGORIES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNTCATEGORIES):
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNTCATEGORIES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCOUNTCATEGORIES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/account-categories';

// Actions

export const getEntities: ICrudGetAllAction<IAccountCategories> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACCOUNTCATEGORIES_LIST,
  payload: axios.get<IAccountCategories>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAccountCategories> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACCOUNTCATEGORIES,
    payload: axios.get<IAccountCategories>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAccountCategories> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACCOUNTCATEGORIES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAccountCategories> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNTCATEGORIES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAccountCategories> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCOUNTCATEGORIES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
