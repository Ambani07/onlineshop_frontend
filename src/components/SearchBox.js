import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox({match}) {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    console.log('SearchBox', history.location.pathname)

    const submitHandler = (e) => {
        e.preventDetailt()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        }else{
            history.push(history.push(history.location.pathname))
        }

        setKeyword(keyword)
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='keyword'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >

            </Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox
