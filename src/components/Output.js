function Output(props) {

    if (props.cardColour === []) {
        return (<p>data not loaded</p>)
    } else if(props.cardColour.length === 1) {
        return (
            <div className="pokeCard" style={{backgroundColor: `${props.cardColour[0]}`}}>
                <h1>{props.cardName}</h1>
            </div>
        )}
        else  if(props.cardColour.length === 2){
            console.log(props.cardColour[1])
        return (
            <div className="pokeCard" stule={{backgroundColor: ""}} style={{backgroundImage: `linear-gradient(135, ${props.cardColour[0]}, ${props.cardColour[1]}`}}>
                <h1>{props.cardName}</h1>
                <h2></h2>
            </div>
        )}
}


export default Output