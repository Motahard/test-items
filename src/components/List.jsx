import React, { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid';
import Item from './Item'

const List = () => {
    const [items, setItems] = useState([])
    const handleClick = () => {
        const min = 10
        const max = 30
        const timeToDelete = Math.floor(Math.random() * (max - min) + min)
        const id = uuid()
        setItems([...items, {
            id,
            timeToDelete
        }])
    }

    const handleRemoveItem = useCallback(id => {
        setItems((items) => items.filter((item) => item.id !== id))
    }, [])

    return (
        <>
            <div className='button-container'>
                <button className='button' onClick={handleClick}>Add new item</button>
            </div>
            <div>
                {items.map((item, index) => <Item 
                                                index={index}
                                                id={item.id}
                                                key={item.id} 
                                                timeToDelete={item.timeToDelete}
                                                handleRemoveItem={handleRemoveItem}
                                            />)}
            </div>
        </>
    )
}

export default List