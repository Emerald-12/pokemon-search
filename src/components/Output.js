function Output(props) {
    return (
        (props.cardColour.length === 1) ? (
            <div className="pokeCard" style={{backgroundColor:` ${props.cardColour[0]}`}}>
                <h1>{props.cardName}</h1>
            </div>
           ) : 
        (props.cardColour.length === 2) ? (
            <div className="pokeCard" 
            style={{background: `linear-gradient(135deg, ${props.cardColour[0]} 20%, ${props.cardColour[1]} 80%)`}}>
                <h1>{props.cardName}</h1>
                <h2>1</h2>
            </div>
        ): null 
    )
}

export default Output