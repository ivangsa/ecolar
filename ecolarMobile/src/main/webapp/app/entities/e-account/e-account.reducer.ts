import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEAccount, defaultValue } from 'app/shared/model/e-account.model';

export const ACTION_TYPES = {
  FETCH_EACCOUNT_LIST: 'eAccount/FETCH_EACCOUNT_LIST',
  FETCH_EACCOUNT: 'eAccount/FETCH_EACCOUNT',
  CREATE_EACCOUNT: 'eAccount/CREATE_EACCOUNT',
  UPDATE_EACCOUNT: 'eAccount/UPDATE_EACCOUNT',
  DELETE_EACCOUNT: 'eAccount/DELETE_EACCOUNT',
  RESET: 'eAccount/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEAccount>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EAccountState = Readonly<typeof initialState>;

// Reducer

export default (state: EAccountState = initialState, action): EAccountState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EACCOUNT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EACCOUNT):
    case REQUEST(ACTION_TYPES.UPDATE_EACCOUNT):
    case REQUEST(ACTION_TYPES.DELETE_EACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EACCOUNT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EACCOUNT):
    case FAILURE(ACTION_TYPES.CREATE_EACCOUNT):
    case FAILURE(ACTION_TYPES.UPDATE_EACCOUNT):
    case FAILURE(ACTION_TYPES.DELETE_EACCOUNT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EACCOUNT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EACCOUNT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EACCOUNT):
    case SUCCESS(ACTION_TYPES.UPDATE_EACCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EACCOUNT):
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

const apiUrl = 'api/e-accounts';

// Actions

export const getEntities: ICrudGetAllAction<IEAccount> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EACCOUNT_LIST,
  payload: axios.get<IEAccount>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEAccount> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EACCOUNT,
    payload: axios.get<IEAccount>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEAccount> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EACCOUNT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEAccount> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EACCOUNT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEAccount> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EACCOUNT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
