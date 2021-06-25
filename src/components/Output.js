import styles from './output.module.css'

function Output(props) {
    return (
        (props.cardColour.length === 1) ? (
            <div className={styles.pokeCard} 
            style={{backgroundColor:` ${props.cardColour[0]}`}}>
                <h1 className={styles.pokeCardTitle}>{props.cardName}</h1>
                <h2 className={styles.dexEntry}>{props.pokeEntry}</h2>
            </div>
           ) : 
        (props.cardColour.length === 2) ? (
            <div className={styles.pokeCard} 
            style={{background: `linear-gradient(135deg, ${props.cardColour[0]} 20%, ${props.cardColour[1]} 80%)`}}>
                <h1 className={styles.pokeCardTitle}>{props.cardName}</h1>
                <h2 className={styles.dexEntry}>{props.pokeEntry}</h2>
            </div>
        ): null
    )
}

export default Output