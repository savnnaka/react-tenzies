import React from "react";

const Stopwatch = (props) => {

    const  [time, setTime] = React.useState(0)
    
    React.useEffect(() => {
        let interval = null 

        if(props.start){
            setTime(0)
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        }else {
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval)
        }

    }, [props.start])

    return (
        <div>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)} : </span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)} : </span>
            <span>{("0" + (time / 10) % 1000).slice(-2)}</span>
        </div>
    )
}

export default Stopwatch