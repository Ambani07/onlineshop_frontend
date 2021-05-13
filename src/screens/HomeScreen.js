import React, { useEffect } from 'react'
//Redux Functions
import { useDispatch, useSelector } from 'react-redux'
//Template Components
import { Row, Col } from 'react-bootstrap'
//Base Components
import Product from '../components/Product'
//Helper Components
import Loader from '../components/Loader'
import Message from '../components/Message'
//Actions
import { listProducts } from '../actions/productActions'

//Components
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen({history}) {
    //init dispatch
    const dispatch = useDispatch()
    //select product list from redux state
    const productList = useSelector(state => state.productList)
    //de-structure state values
    const { error, loading, products, pages, page } = productList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            
            <h1>Latest Products</h1>

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default HomeScreen
