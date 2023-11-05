const Die = (props) => {
    return (
        <div 
        className={props.isHeld ? "die-face-held" : "die-face"}
        onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die