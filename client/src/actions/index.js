import streams from '../apis/streams'
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from '../types'
import history from '../history'

export const signIn = (userId, imageUrl, username) => {
    return {
        type: SIGN_IN,
        payload: { userId, imageUrl, username }
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams/new', { ...formValues, userId });
    console.log(response);
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
}

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/show/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.put(`/streams/edit/${id}`, formValues); //updates some properties to the form state
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/delete/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id});
    history.push('/');
}