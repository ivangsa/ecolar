import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHouseHold, defaultValue } from 'app/shared/model/house-hold.model';

export const ACTION_TYPES = {
  FETCH_HOUSEHOLD_LIST: 'houseHold/FETCH_HOUSEHOLD_LIST',
  FETCH_HOUSEHOLD: 'houseHold/FETCH_HOUSEHOLD',
  CREATE_HOUSEHOLD: 'houseHold/CREATE_HOUSEHOLD',
  UPDATE_HOUSEHOLD: 'houseHold/UPDATE_HOUSEHOLD',
  DELETE_HOUSEHOLD: 'houseHold/DELETE_HOUSEHOLD',
  RESET: 'houseHold/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHouseHold>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HouseHoldState = Readonly<typeof initialState>;

// Reducer

export default (state: HouseHoldState = initialState, action): HouseHoldState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HOUSEHOLD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOUSEHOLD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOUSEHOLD):
    case REQUEST(ACTION_TYPES.UPDATE_HOUSEHOLD):
    case REQUEST(ACTION_TYPES.DELETE_HOUSEHOLD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HOUSEHOLD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOUSEHOLD):
    case FAILURE(ACTION_TYPES.CREATE_HOUSEHOLD):
    case FAILURE(ACTION_TYPES.UPDATE_HOUSEHOLD):
    case FAILURE(ACTION_TYPES.DELETE_HOUSEHOLD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOUSEHOLD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOUSEHOLD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOUSEHOLD):
    case SUCCESS(ACTION_TYPES.UPDATE_HOUSEHOLD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOUSEHOLD):
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

const apiUrl = 'api/house-holds';

// Actions

export const getEntities: ICrudGetAllAction<IHouseHold> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOUSEHOLD_LIST,
  payload: axios.get<IHouseHold>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHouseHold> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSEHOLD,
    payload: axios.get<IHouseHold>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHouseHold> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOUSEHOLD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHouseHold> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOUSEHOLD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHouseHold> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOUSEHOLD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
