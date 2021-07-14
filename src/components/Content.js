import { useState, useEffect } from 'react'

import typeList from './../resources/typeList'
import Output from './Output'
import styles from './content.module.css'



function Content() {

	//come here for all your state needs
	const [query, setQuery] = useState('')
	const [pokeInfo, setPokeInfo] = useState({ name: '' })
	const [pokeTypes, setPokeTypes] = useState([])
	const [pokeEntry, setPokeEntry] = useState()
	const [failedToLoad, setFailedToLoad] = useState(false)

	//this still needs reworking
	const [isLoading, toggleIsLoading] = useState()

	const [stateColours, setStateColours] = useState(['white', 'white'])

	//checks the full colour list to see if our type array(state) includes
	//the type of any entry in the full colour list
	//then pushed the colour codes for our types in to the colourCodes array


	//same as above, but checks each entry for either type one or type 2
	//very workaround way of doing things, blame Gustav
	function findPokeColors() {
		let colourCodes = []
		if (pokeTypes.length === 1) {
			for (let i = 0; i < typeList.length; i++) {
				if (pokeTypes[0] === typeList[i].type) {
					colourCodes.push(typeList[i].colour)
				}
			}
		}

		else if (pokeTypes.length === 2) {
			for (let i = 0; i < typeList.length; i++) {
				if (pokeTypes[0] === typeList[i].type) {
					colourCodes.push(typeList[i].colour)
				}
			}
		}
		for (let i = 0; i < typeList.length; i++) {
			if (pokeTypes[1] === typeList[i].type) {
				colourCodes.push(typeList[i].colour)
			}
		}
		console.log(colourCodes)
		setStateColours(colourCodes)
	}

	const searchPoke = async (e) => {
		//defines the url dynamically using teplate literals
		setFailedToLoad(false)
		toggleIsLoading(true)
		setPokeInfo({ name: '' })
		let url = `https://pokeapi.co/api/v2/pokemon/${query}`
		let urlDex = `https://pokeapi.co/api/v2/pokemon-species/${query}`
		try {

			//attepts to get the url and save it in a const
			//await means that we allow the process to take time (think ping)
			const res = await fetch(url);
			const resDex = await fetch(urlDex)
			//console.logs the state of us reaching the site (true/false)
			console.log(`statResOK: ${res.ok}`)
			console.log(`statResOK: ${resDex.ok}`)
			!res.ok ? setFailedToLoad(true) : setFailedToLoad(false);

			const data = await res.json();
			const dataDex = await resDex.json()
			res.ok ? toggleIsLoading(false) : toggleIsLoading(true);

			console.log(data);
			console.log(dataDex)
			
			setPokeInfo(data);
			
				//sets the array state to hold the types from the pokemon
				//can't use the pokeInfo state but rather data since it has to occur
				//after new data fetch
				setPokeTypes(data.types.map((i) => i.type.name))
				//immediately invoked function, previously getDex function
			const getDex = () => {
				
				for (let i = 10; i < dataDex.flavor_text_entries.length; i++) {
					if (dataDex.flavor_text_entries[i].language.name === 'en') {
						setPokeEntry(dataDex.flavor_text_entries[i].flavor_text)
						return
					}
					else {
						setPokeEntry(dataDex.flavor_text_entries[i].flavor_text)
					}
				}
			}
			getDex();


			//making a load error code here, eventually
			//  res.ok ? null : <p>Failed to load new pokemon</p>
		} catch (e) { console.log(e) }
	}

	//when input field is focused, highlight the input field text
	const handleFocus = (e) => {
		e.target.select()
	}

	//makes the input field do the stuff the button does when you press enter
	const handleEnter = (e) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			searchPoke()
			handleFocus(e)
		}
	}
	
	//executes the colour checks whenever pokeTypes state changes
	//possibly inefficient since it also checks on initial declaration
	useEffect(() => {
		findPokeColors()
	}, [pokeTypes])

	return (
		<>
			<div>
				<label className={styles.label} htmlFor="query">Pokemon</label>

				<input className={styles.input} type="text" name="query" placeholder="Enter Name or ID"
					ref={input => input && input.focus()}
					onFocus={handleFocus}
					onKeyPress={(e) => handleEnter(e)}
					onChange={(e) => (e.target.value.toLowerCase()==='meowstic') ? setQuery(678) : (e.target.value.toLowerCase() == 10025) ? setQuery(678):setQuery(e.target.value.toLowerCase()) }
				/>

				<button className={styles.button}
					onClick={() => searchPoke()}
				>Search
				</button>
			</div>

			<div>
				{(isLoading && !failedToLoad) ?
					(<h1 className={styles.responseMessage}>Loading Pokemon</h1>) : (
						failedToLoad ?
							(<h1 className={styles.responseMessage}>Failed to load Pokemon</h1>) :
							(<div>
								<h1 style={{ color: 'Black' }} classname={styles.responseMessage}>Your Pokemon is:</h1>
								<Output
									cardColour={stateColours}
									pokeInfo={pokeInfo}
									pokeEntry={pokeEntry}
								/>
							</div>))}
			</div>
		</>
	)
}
export default Content