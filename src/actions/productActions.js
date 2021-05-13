//Promise based HTTP client
import axios from 'axios'
//Constants
import {
    //Products list constants
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    //Product details constants
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    //Product delete constants
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    //Product create constants
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    //Product update constants
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    //Product review
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

} from '../constants/productConstant'

export const listProducts = (keyword = '') => async (dispatch) => {
    try{
        //set product initial redux state
        dispatch({type: PRODUCT_LIST_REQUEST})
        
        //fetch all products
        const {data} = await axios.get(`/api/products/${keyword}`)

        //add to redux products storage
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error) {
        //add fetch products error to storage
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}


export const listTopProducts = (keyword = '') => async (dispatch) => {
    try{
        //set product initial redux state
        dispatch({type: PRODUCT_TOP_REQUEST})
        
        //fetch all products
        const {data} = await axios.get(`/api/products/${keyword}/top/`)

        //add to redux products storage
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    }catch(error) {
        //add fetch products error to storage
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        //set product initial redux state
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        
        //fetch all products
        const { data } = await axios.get(`/api/products/${id}`)
        
        //add to redux product storage
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        //add fetch product error to storage
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
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
            `/api/products/delete/${id}/`,
            config
        )
        
        //Store data to redux store
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
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
        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        
        //Store data to redux store
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
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
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        
        //Store data to redux store
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

         //Store data to redux store
         dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
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
        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
    

         //Store data to redux store
         dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        //add fetch products error to storage

        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message,
        })
    }
}