import React from 'react'

const Item = ({ text, dispatch, id, completed,settext,setIsEdit,setEid}) => {
    return (
        <div>
            <span style={{ color: completed ? 'green' : 'red' }}>{text}</span>
            <button onClick={() => dispatch({ type: 'toggle', payload: { id:id } })}>
                Toggle</button>
            <button onClick={() => dispatch({ type: 'delete', payload: { id:id } })}>Delete</button>
            <button onClick={() => dispatch({ type: 'edit', payload: { id:id, settext:settext ,setIsEdit:setIsEdit,setEid:setEid} })}>Edit</button>
        </div>
    )
}

export default Item
