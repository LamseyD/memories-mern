import * as api from '../api'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

//create api request from backend here and dispatch it to store with redux and thunk

//use thunk because it's async
export const getPosts = () => async (dispatch) => {
    //every action contains a type and payload
    try {
        const { data } = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error)
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
    } catch (error){
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}