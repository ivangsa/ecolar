import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAccountsDocument, defaultValue } from 'app/shared/model/accounts-document.model';

export const ACTION_TYPES = {
  FETCH_ACCOUNTSDOCUMENT_LIST: 'accountsDocument/FETCH_ACCOUNTSDOCUMENT_LIST',
  FETCH_ACCOUNTSDOCUMENT: 'accountsDocument/FETCH_ACCOUNTSDOCUMENT',
  CREATE_ACCOUNTSDOCUMENT: 'accountsDocument/CREATE_ACCOUNTSDOCUMENT',
  UPDATE_ACCOUNTSDOCUMENT: 'accountsDocument/UPDATE_ACCOUNTSDOCUMENT',
  DELETE_ACCOUNTSDOCUMENT: 'accountsDocument/DELETE_ACCOUNTSDOCUMENT',
  RESET: 'accountsDocument/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAccountsDocument>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AccountsDocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: AccountsDocumentState = initialState, action): AccountsDocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNTSDOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNTSDOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_ACCOUNTSDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNTSDOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNTSDOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_ACCOUNTSDOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNTSDOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNTSDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCOUNTSDOCUMENT):
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

const apiUrl = 'api/accounts-documents';

// Actions

export const getEntities: ICrudGetAllAction<IAccountsDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT_LIST,
  payload: axios.get<IAccountsDocument>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAccountsDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACCOUNTSDOCUMENT,
    payload: axios.get<IAccountsDocument>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAccountsDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACCOUNTSDOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAccountsDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNTSDOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAccountsDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCOUNTSDOCUMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
