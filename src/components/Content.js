import { useState, useEffect } from 'react'

import typeList from './../resources/typeList'
import Output from './Output'



function Content() {

	//come here for all your state needs
	const [query, setQuery] = useState(1)
	const [pokeInfo, setPokeInfo] = useState({ name: '' })
	const [pokeTypes, setPokeTypes] = useState([])
	const [pokeEntry, setPokeEntry] = useState()
	const [pokeDex, setPokeDex] = useState()

	//this still needs reworking
	const [isLoading, toggleIsLoading] = useState(true)

	const [stateColours, setStateColours] = useState(['white', 'white'])


	//the array we pass the typing colours to
	//this shouldn't work like it does, but it does, i'll leave it in for fun
	//if it breaks move in to top level of findPokeColours
	let colourCodes = []

	//checks the full colour list to see if our type array(state) includes
	//the type of any entry in the full colour list
	//then pushed the colour codes for our types in to the colourCodes array


	//same as above, but checks each entry for either type one or type 2
	//very workaround way of doing things, blame Gustav
	function findPokeColors() {
		console.log(pokeTypes)
		if (pokeTypes.length === 1) {
			for (let i = 0; i < typeList.length; i++) {
				if (pokeTypes[0] === typeList[i].type) {
					console.log(typeList[i].type)
					colourCodes.push(typeList[i].colour)
				}
			}
		}

		else if (pokeTypes.length === 2) {
			for (let i = 0; i < typeList.length; i++) {
				if (pokeTypes[0] === typeList[i].type) {
					console.log(typeList[i].type)
					colourCodes.push(typeList[i].colour)
				}
			}
		}
		for (let i = 0; i < typeList.length; i++) {
			if (pokeTypes[1] === typeList[i].type) {
				console.log(typeList[i].type)
				colourCodes.push(typeList[i].colour)
			}
		}
		console.log(colourCodes)
		setStateColours(colourCodes)
	}

	const searchPoke = async (e) => {
		//defines the url dynamically using teplate literals
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

			const data = await res.json();
			const dataDex = await resDex.json()

			console.log(data);
			console.log(dataDex)

			//saves the data in a state so it can be used outside the function
			setPokeInfo(data);
			setPokeDex(dataDex)

			//temporary solution, should be rewritten
			//handles the display of pokemon name technically
			!pokeInfo ? toggleIsLoading(!isLoading) : toggleIsLoading(isLoading)

			//sets the array state to hold the types from the pokemon
			//can't use the pokeInfo state but rather data since it has to occur
			//after new data fetch
			setPokeTypes(data.types.map((i) => i.type.name))
			let variable = undefined
			const getDex = () => {

				for (let i = 10; i < dataDex.flavor_text_entries.length; i++) {
					if (dataDex.flavor_text_entries[i].language.name === 'en') {
						setPokeEntry(dataDex.flavor_text_entries[i].flavor_text.replace('\f', ' '))
						return
					}
					else {
						variable = dataDex.flavor_text_entries[i].flavor_text.replace('\f', ' ')
						setPokeEntry(variable)

					}
				}
			}
			getDex()

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
				<label className="label" htmlFor="query">Pokemon</label>

				<input className="input" type="text" name="query" placeholder="Enter Name or ID"
					ref={input => input && input.focus()}
					onFocus={handleFocus}
					onKeyPress={(e) => handleEnter(e)}
					onChange={(e) => setQuery(e.target.value)}
				/>

				<button className="button"
					onClick={() => searchPoke()}
				>Search
				</button>

				{
					//ternary! fancy term for a variant of if
					//if still loading in data, don't do stuff
					//if not loading in stuff, make this html element
				}
				{isLoading ? null : <p>{pokeInfo.name}</p>}
			</div>

			<Output
				cardColour={stateColours}
				cardName={pokeInfo.name}
			/>
			<p>{pokeEntry}</p>

		</>
	)
}

export default Content