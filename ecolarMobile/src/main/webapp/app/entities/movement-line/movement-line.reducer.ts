import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMovementLine, defaultValue } from 'app/shared/model/movement-line.model';

export const ACTION_TYPES = {
  FETCH_MOVEMENTLINE_LIST: 'movementLine/FETCH_MOVEMENTLINE_LIST',
  FETCH_MOVEMENTLINE: 'movementLine/FETCH_MOVEMENTLINE',
  CREATE_MOVEMENTLINE: 'movementLine/CREATE_MOVEMENTLINE',
  UPDATE_MOVEMENTLINE: 'movementLine/UPDATE_MOVEMENTLINE',
  DELETE_MOVEMENTLINE: 'movementLine/DELETE_MOVEMENTLINE',
  RESET: 'movementLine/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMovementLine>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MovementLineState = Readonly<typeof initialState>;

// Reducer

export default (state: MovementLineState = initialState, action): MovementLineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MOVEMENTLINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MOVEMENTLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MOVEMENTLINE):
    case REQUEST(ACTION_TYPES.UPDATE_MOVEMENTLINE):
    case REQUEST(ACTION_TYPES.DELETE_MOVEMENTLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MOVEMENTLINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MOVEMENTLINE):
    case FAILURE(ACTION_TYPES.CREATE_MOVEMENTLINE):
    case FAILURE(ACTION_TYPES.UPDATE_MOVEMENTLINE):
    case FAILURE(ACTION_TYPES.DELETE_MOVEMENTLINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOVEMENTLINE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOVEMENTLINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MOVEMENTLINE):
    case SUCCESS(ACTION_TYPES.UPDATE_MOVEMENTLINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MOVEMENTLINE):
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

const apiUrl = 'api/movement-lines';

// Actions

export const getEntities: ICrudGetAllAction<IMovementLine> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MOVEMENTLINE_LIST,
  payload: axios.get<IMovementLine>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMovementLine> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MOVEMENTLINE,
    payload: axios.get<IMovementLine>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMovementLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MOVEMENTLINE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMovementLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MOVEMENTLINE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMovementLine> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MOVEMENTLINE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
