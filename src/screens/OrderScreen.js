import React, { useState, useEffect} from 'react'
//Redux
import { useDispatch, useSelector } from 'react-redux'

import { PayPalButton } from 'react-paypal-button-v2'

//Template
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

//Router Dom
import { Link } from 'react-router-dom'

//Helper Components
import Message from '../components/Message'
import Loader from '../components/Loader'

//Actions
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'

//Constants
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


function OrderScreen({ match, history }) {
    //get url order id
    const orderId = match.params.id
    //init dispatch
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)

    //get order from redux state
    const orderDetails = useSelector(state => state.orderDetails)
    //de-structure order from redux state
    const{ order, error, loading } = orderDetails

    //get order from redux state
    const orderPay = useSelector(state => state.orderPay)
    //de-structure order from redux state
    const{ loading: loadingPay, success: successPay } = orderPay

    //get order from redux state
    const orderDeliver = useSelector(state => state.orderDeliver)
    //de-structure order from redux state
    const{ loading: loadingDeliver, success: successDeliver } = orderDeliver

    //get user login from redux state
    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin
    if(!loading && !error) {
        //prices
        order.itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AWVw399SFxHiQOgEDPKIFpu_7I22lyh83d9AhoGL3jOx-3N-sH8F1WOBwSbWpKgbV93KCHh6AIRAgqQa'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    
    useEffect(() => {

        if(!userInfo) {
            history.push('/login')
        }

        if(!order || successPay || order._id !== Number(orderId) || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId)) 
        }else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    },[dispatch, order, orderId, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return  loading ? (
        <Loader />
    ): error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name} </p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
                            <p>
                                <strong>shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ): (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>payment: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <Message variant='success'>Pain on {order.paidAt}</Message>
                            ): (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                            <p></p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X R{item.price} = R{(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>R{order.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>R{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>R{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>R{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ): (
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}

                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
        )
}

export default OrderScreen
