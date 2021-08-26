import styles from './output.module.css'

function Output(props) {
    return (
        props.pokeInfo ? (
            <div className={styles.pokeCard}
                style={props.cardColour.length === 1 ?
                    { backgroundColor: ` ${props.cardColour[0]}` } : props.cardColour.length === 2
                        ?{ background: `linear-gradient(135deg, ${props.cardColour[0]} 20%, ${props.cardColour[1]} 80%)`}
                        :{ backgroundColor: 'silver' }}>

                <div className={styles.pokeText}>
                    <h1 className={styles.pokeCardTitle}>{props.pokeInfo.name}</h1>
                    <h2 className={styles.dexEntry}>{props.pokeEntry}</h2>
                </div>

                <div className={styles.pokeSprites}>
                {props.pokeInfo.name  !== '' && props.pokeInfo.name !== undefined &&
                <>
                    <div>
                        <img src={props.pokeInfo.sprites.front_default} alt='' />
                        <img src={props.pokeInfo.sprites.back_default} alt='' />
                    </div>
                    
                    <div>
                        <img src={props.pokeInfo.sprites.front_shiny} alt='' />
                        <img src={props.pokeInfo.sprites.back_shiny} alt='' />
                    </div>
                </>}
                </div>
        
                <div className={styles.pokeStats}>
                {props.pokeInfo.name  !== '' && props.pokeInfo.name !== undefined && 
                <div style={{display:'flex',
                flexDirection:'row'}}>
                    <div style={{display:'flex',
                    flexDirection:'column', width:'50%',
                    margin:'5px'}}>
                        <p>HP: {props.pokeInfo.stats[0].base_stat}</p>
                        <p>Attack: {props.pokeInfo.stats[1].base_stat}</p>
                        <p>Defense: {props.pokeInfo.stats[2].base_stat}</p>
                    </div>

                    <div style={{display:'flex',
                    flexDirection:'column',
                    width: '50%',
                    margin:'5px'}}>
                        <p>S. Attack: {props.pokeInfo.stats[3].base_stat}</p>
                        <p>S. Defence: {props.pokeInfo.stats[4].base_stat}</p>
                        <p>Speed: {props.pokeInfo.stats[5].base_stat}</p>
                    </div>
                </div>}
                </div>
            </div>) : (<div style={{ backgroundColor: 'silver' }}></div>)
    )
}

export default Output