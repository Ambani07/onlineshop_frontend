//Store
import { createStore, combineReducers, applyMiddleware } from 'redux'
//Middleware
import thunk from 'redux-thunk'
//Redux tools
import { composeWithDevTools } from 'redux-devtools-extension'
//Reducers
import { 
    productListReducers,
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
    productReviewCreateReducers,
    productTopRatedReducers
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
import { 
    userLoginReducers, 
    userRegisterReducers, 
    userDetailsReducers, 
    userUpdateProfileReducers,
    userListReducers,
    userDeleteReducers,
    userUpdateReducers
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer
} from './reducers/orderReducers'

//init reducers
const reducer = combineReducers({
    //Products
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productReviewCreate: productReviewCreateReducers,
    productTopRated: productTopRatedReducers,
    //Cart
    cart: cartReducer,
    //Users
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    //Orders
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    //Admin User
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers,
    //Admin Product
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers
})

//add cart to localStorage initial state
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

//add cart to localStorage initial state
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null

//add cart to localStorage initial state
const shippingInfoFromLocalStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

//initial app state
const initialState = {
    cart: { 
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingInfoFromLocalStorage
    },
    userLogin: { userInfo: userInfoFromLocalStorage }
}

//declare app middleware
const middleware = [thunk]

//create store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store