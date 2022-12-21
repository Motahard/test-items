import React, { useEffect, useState, useRef } from 'react'

const Item = ({ index, id, timeToDelete, handleRemoveItem }) => {
    const [timer, setTimer] = useState(timeToDelete.toString());
    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        return {
            total, seconds
        };
    }

    const startTimer = (e) => {
        let { total, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer((seconds > 9 ? seconds : '0' + seconds))
        }
    }

    const clearTimer = (e) => { 
        setTimer(timeToDelete.toString());
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + timeToDelete);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    useEffect(() => {
        setTimeout(() => {
            handleRemoveItem(id)
        }, timeToDelete * 1000)
    }, [])

    return (
        <div className='card'>
            <p className='card-index'>ID #{index}</p>
            <p className='card-timer'>Seconds to remove: {timer}</p>
        </div>
    )
}

export default React.memo(Item)