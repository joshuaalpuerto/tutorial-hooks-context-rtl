import { FETCHING, SUCCESS, ERROR } from './constants';

export const fetching = () => ({ type: FETCHING });
export const success = payload => ({ type: SUCCESS, payload });
export const error = (payload) => ({
    type: ERROR,
    payload
});