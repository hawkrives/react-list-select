// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import List from '../src/list'
import values from 'lodash/values'

/*
	EXAMPLE 1
*/

let hashmap = {
	NY: 'New York',
	MN: 'Minnesota',
	SC: 'South Carolina',
	MO: 'Missouri',
	SD: 'South Dakota',
	DE: 'Delaware',
	MS: 'Mississippi',
	TN: 'Tennessee',
	FL: 'Florida',
	MT: 'Montana ',
}

let e1items = values(hashmap)

let example1 = (
	<List items={e1items} selected={[3]} disabled={[0, 4, 6, 7, 9]} />
)
let example1multi = (
	<List items={e1items} selected={[2, 4, 6]} multiple={true} />
)

/*
	EXAMPLE 3
*/

let e3items = [
	'New file',
	'New folder',
	'Copy',
	'Cut',
	'Paste',
	'Refresh',
	'Open',
	'Delete',
]

let example3 = <List items={e3items} disabled={[3, 7]} />

/*
	EXAMPLE 4
*/

function comp(name, email) {
	return (
		<div className="contact">
			<div className="name">{name}</div>
			<div className="email">{email}</div>
		</div>
	)
}

let comps = [
	comp('Mike', 'mike@server.com'),
	comp('John', 'john@server.com'),
	comp('Bob', 'bob@server.com'),
	comp('Max', 'max@server.com'),
]

let example4 = (
	<List
		items={comps}
		disabled={[2]}
		selected={[0]}
		onChange={console.log.bind(console)}
	/>
)

/*
	EXAMPLE 5
*/

let example5 = (
	<List
		keyboardEvents={false}
		items={comps}
		disabled={[2]}
		selected={[0]}
		onChange={console.log.bind(console)}
	/>
)

/*
	EXAMPLE 6
*/

let e6items = [
	'New file',
	'New folder',
	'Copy',
	'Cut',
	'Paste',
	'Refresh',
	'Open',
	'Delete',
]

let example6 = <List items={e6items} listItemClassName="list-item--animate" />

let e7items = [
	'One',
	'Two',
	'Three',
	'For',
	'Five',
	'Six',
	'Seven',
	'Eight',
	'Nine',
	'Ten'
]

let example7 = <List items={e7items} onListItemReceiveFocus={(focusedIndex, element) => {
	let domElement = ReactDOM.findDOMNode(element);

	domElement.scrollIntoView({
		behavior: 'smooth',
		block: 'nearest'
	});
}}/>

let Demo = () => (
	<div className="demo">
		<div>
			{example1} {example1multi}
		</div>
		<div className="context-menu">{example3}</div>
		<div>{example4}</div>
		<div>{example5}</div>
		<div>{example6}</div>
		<div style={{overflowY: 'scroll', height: '200px'}}>
			{example7}
		</div>
	</div>
)

let demo = document.getElementById('container')
if (demo) {
	ReactDOM.render(<Demo />, demo)
}
