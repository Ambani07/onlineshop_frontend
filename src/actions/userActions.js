import axios from 'axios'
import {
    //Login Constants
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    //Resiger Constants
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    //User Details Constants
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_DETAILS_FAIL,
    //User Details Constants
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    //User list Constants
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_LIST_FAIL,
    //User delete
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    //User update Constants
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    //Logout Constant
    USER_LOGOUT,

} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        //API REQUEST
        const { data } = await axios.post(
            '/api/users/login/',
            {'username': email , 'password': password},
            config
        )
        
        //Store user data to redux store
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //Store user data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))



    } catch (error) {
        //add fetch products error to storage
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? 'test'
                : 'Incorrect Credentials, please make sure you enter the correct username and email',
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        //API REQUEST
        const { data } = await axios.post(
            '/api/users/register/',
            {'name': name,'email': email, 'password': password},
            config
        )
        
        //Store user register data to redux store
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //Store user login data to redux store
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //Store user data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))



    } catch (error) {
        //add fetch products error to storage
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? 'test'
                : 'Could not register user. Please make sure the form is completed correctly.',
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        //get current user
        const { userLogin: { userInfo }, } = getState()

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //API REQUEST
        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )
        
        //Store user register data to redux store
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        //get current user
        const { userLogin: { userInfo }, } = getState()

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //API REQUEST
        const { data } = await axios.put(
            '/api/users/profile/update/',
            user,
            config
        )
        
        //Store user register data to redux store
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

         //log user with updated data
         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //Update user information in localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        //get current user
        const { userLogin: { userInfo }, } = getState()

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //API REQUEST
        const { data } = await axios.get(
            '/api/users/',
            config
        )
        
        //Store user register data to redux store
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        //get current user
        const { userLogin: { userInfo }, } = getState()

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //API REQUEST
        const { data } = await axios.delete(
            `/api/users/delete/${id}`,
            config
        )
        
        //Store user register data to redux store
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        //get current user
        const { userLogin: { userInfo }, } = getState()

        //HTTP CONFIG
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //API REQUEST
        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )
        
        //Store user register data to redux store
        dispatch({
            type: USER_UPDATE_SUCCESS
        })

        //Store user register data to redux store
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}