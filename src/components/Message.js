import React from 'react'
//Template Components
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {
    return (
        <Alert variant={variant} >
            {children}
        </Alert>
    )
}

export default Message
