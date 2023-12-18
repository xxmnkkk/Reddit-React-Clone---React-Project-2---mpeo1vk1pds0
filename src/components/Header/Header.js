import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from "../../redux/reducers/headerSlice";

export default function Header() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch()

    console.log("running header");

    return (
        <>
            <button onClick={() => dispatch(increment())}>+</button>
            <div>{count}</div>
            <button onClick={() => dispatch(decrement())}>-</button>
        </>
    )
}
