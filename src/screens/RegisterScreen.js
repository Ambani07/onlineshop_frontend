import React, { useState, useEffect} from 'react'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Router Dom
import { Link } from 'react-router-dom'

//Template
import { Form, Button, Row, Col } from 'react-bootstrap'

//Helper Components
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

//Actions
import { register } from '../actions/userActions'

function RegisterScreen({location, history}) {
    //Component state variables
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    //init dispatch
    const dispatch = useDispatch()

    //redirect
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //select user info from redux state
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
        
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader /> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
