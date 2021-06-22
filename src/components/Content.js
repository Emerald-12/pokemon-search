import { useState, useEffect } from 'react'

import Output from './Output'



function Content() {
//this should 100% definitely be it's own document
//what are you even doing with your life
	const colours =[ {
		type: 'normal',
		colour: '#A8A77AFF'},
		{type: 'fire',
		colour: '#EE8130FF'},
		{type: 'water',
		colour: '#6390F0FF'},
		{type: 'electric',
		colour: '#F7D02CFF'},
		{type: 'grass',
		colour: '#7AC74CFF'},
		{type: 'ice',
		colour: '#96D9D6FF'},
		{type: 'fighting',
		colour: '#C22E28FF'},
		{type: 'poison',
		colour: '#A33EA1FF'},
		{type: 'ground',
		colour: '#E2BF65FF'},
		{type: 'flying',
		colour: '#A98FF3FF'},
		{type: 'psychic',
		colour: '#F95587FF'},
		{type: 'bug',
		colour: '#A6B91AFF'},
		{type: 'rock',
		colour: '#B6A136FF'},
		{type: 'ghost',
		colour: '#735797FF'},
		{type: 'dragon',
		colour: '#6F35FCFF'},
		{type: 'dark',
		colour: '#705746FF'},
		{type: 'steel',
		colour: '#B7B7CEFF'},
		{type: 'fairy',
		colour: '#D685ADFF'}
]
//come here for all your state needs
	const [query, setQuery] = useState(1)
	const [pokeInfo, setPokeInfo] = useState({name:''})
	const [isLoading, toggleIsLoading] = useState(true)
	const [pokeTypes, setPokeTypes] = useState([])
	const [stateColours, setStateColours] = useState(['white', 'white'])
	

	//the array we pass the typing colours to
	let colourCodes = []

	//checks the full colour list to see if our type array(state) includes
	//the type of any entry in the full colour list
	//then pushed the colour codes for our types in to the colourCodes array
	function findPokeColor() {
		for (let i = 0; i < colours.length; i++) {
			if (colours[i].type.includes(pokeTypes[0])) {
				colourCodes.push(colours[i].colour)
				setStateColours(colourCodes)
			}
		}
		//debugging 'cuz i good dev
		console.log(colourCodes)
	}

	//same as above, but checks each entry for either type one or type 2
	//very workaround way of doing things, blame Gustav
	function findPokeColors() {
		for (let i = 0; i < colours.length; i++) {
			if (colours[i].type.includes(pokeTypes[0]) || (colours[i].type.includes(pokeTypes[1]))) {
				colourCodes.push(colours[i].colour)
				setStateColours(colourCodes)
			}
		}
		//see above
		console.log(colourCodes)
	}

	const searchPoke = async (e) => {
		//defines the url dynamically using teplate literals
		let url = `https://pokeapi.co/api/v2/pokemon/${query}`
		try {
			
			//attepts to get the url and save it in a const
			//await means that we allow the process to take time (think ping)
			const res = await fetch(url);
			
			//console.logs the state of us reaching the site (true/false)
			console.log(`statResOK: ${res.ok}`)
			const data = await res.json();
			console.log(data);
			
			//saves the data in a state so it can be used outside the function
			setPokeInfo(data);
			
			//temporary solution, should be rewritten
			//handles the display of pokemon name technically
			!pokeInfo ? toggleIsLoading(!isLoading) : toggleIsLoading(isLoading)
			
			//sets the array state to hold the types from the pokemon
			//can't use the pokeInfo state but rather data since it has to occur
			//after new data fetch
			setPokeTypes(data.types.map((i) => i.type.name))

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
		pokeTypes.length === 1 ? findPokeColor() : findPokeColors()
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
			cardColour = {stateColours}
			cardName={pokeInfo.name}
			/>

		</>
	)
}

export default Content