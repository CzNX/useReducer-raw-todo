import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ list,deleteHandler,editHandler }) => {



    return (
        <div className='list-items'>
            {list.map((item, index) => {
                const { id, text } = item;
                return (
                    <div key={id} className="list-item">
                        <p className='text'><span>{index + 1}.</span> {text}</p>
                        <div className="btn-section">
                            <button className='edit-btn' type='button' onClick={(e) => editHandler(id)}>
                                <FaEdit />
                            </button>
                            <button className='del-btn' type='button' onClick={(e) => deleteHandler(id)}>
                                <FaTrash />
                            </button>
                        </div>

                    </div>


                )
            })}

        </div>
    )
}

export default List
