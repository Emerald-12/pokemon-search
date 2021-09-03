import styles from './output.module.css'

function Output(props) {
    return (
        props.pokeInfo ? (
            <div className={styles.pokeCard}
                style={props.cardColour.length === 1 ?
                    { backgroundColor: ` ${props.cardColour[0]}` } : props.cardColour.length === 2
                        ?{ background: `linear-gradient(135deg, ${props.cardColour[0]} 20%, ${props.cardColour[1]} 80%)`}
                        :{ backgroundColor: 'silver' }}>

                    <h2 className={styles.pokeCardTitle}>{props.pokeInfo.name}</h2>
                    <h2 className={styles.dexEntry}>{props.pokeEntry}</h2>

                <div className={styles.pokeSprites}>
                {props.pokeInfo.name  !== '' && props.pokeInfo.name !== undefined &&
                <>
                    
                        <img style={{gridArea:'sprite1'}} src={props.pokeInfo.sprites.front_default} alt='' />
                        <img style={{gridArea:'sprite2'}} src={props.pokeInfo.sprites.back_default} alt='' />
                    
                    
                    
                        <img style={{gridArea:'sprite3'}} src={props.pokeInfo.sprites.front_shiny} alt='' />
                        <img style={{gridArea:'sprite4'}} src={props.pokeInfo.sprites.back_shiny} alt='' />
                    
                </>}
                </div>
        
                <div className={styles.pokeStats}>
                {props.pokeInfo.name  !== '' && props.pokeInfo.name !== undefined && 
                <>
                    <div className={styles.stat1}>
                        <p>HP: {props.pokeInfo.stats[0].base_stat}</p>
                        <p>Attack: {props.pokeInfo.stats[1].base_stat}</p>
                        <p>Defense: {props.pokeInfo.stats[2].base_stat}</p>
                    </div>

                    <div className={styles.stat2}>
                        <p>S. Attack: {props.pokeInfo.stats[3].base_stat}</p>
                        <p>S. Defence: {props.pokeInfo.stats[4].base_stat}</p>
                        <p>Speed: {props.pokeInfo.stats[5].base_stat}</p>
                    </div>
                </>}
                </div>
            </div>) : (<div style={{ backgroundColor: 'silver' }}></div>)
    )
}

export default Output
