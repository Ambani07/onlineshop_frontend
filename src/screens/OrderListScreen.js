import React, { useState, useEffect} from 'react'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Router
import { Link } from 'react-router-dom'
//Bootstrap Router
import { LinkContainer } from 'react-router-bootstrap'
//Template
import { Table, Button} from 'react-bootstrap'
//Helper Components
import Loader from '../components/Loader'
import Message from '../components/Message'

//Actions
import { listOrders } from '../actions/orderActions'

function OrderListScreen({ history }) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }

        
    }, [dispatch, history, userInfo])


    return (
        <div>
            <h1>Orders</h1>
            {loading 
            ? (<Loader /> )
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'> 
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Pain</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>R{order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ): (
                                            <i className='fas fa-times' style={{color: 'red'}}></i>
                                        )}
                                    </td>
                                    <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ): (
                                            <i className='fas fa-times' style={{color: 'red'}}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </div>
    )
}

export default OrderListScreen