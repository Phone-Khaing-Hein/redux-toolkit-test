import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrease, increase } from '../redux/countSlice';

const CounterComponent = () => {

    const { count } = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(decrease())}>-</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increase())}>+</button>
        </div>
    )
}

export default CounterComponent;