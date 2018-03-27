import React from 'react'
import List, { MakeList } from '../index'
import values from 'lodash/object/values'

/*
	EXAMPLE 1
*/

var hashmap = {
	'NY': 'New York',
	'MN': 'Minnesota',
	'SC': 'South Carolina',
	'MO': 'Missouri',
	'SD': 'South Dakota',
	'DE': 'Delaware',
	'MS': 'Mississippi',
	'TN': 'Tennessee',
	'FL': 'Florida',
	'MT': 'Montana '
}

var items = values(hashmap)

var example1 = <List items={items} selected={[3]} disabled={[0, 4, 6, 7, 9]} />
var example1multi = <List items={items} selected={[2, 4, 6]} multiple={true} />


/*
	EXAMPLE 3
*/

var items = ['New file', 'New folder', 'Copy', 'Cut', 'Paste', 'Refresh', 'Open', 'Delete']

var example3 = <List items={items} disabled={[3, 7]} />


/*
	EXAMPLE 4
*/

function comp(name, email) {
	return <div className='contact'>
		<div className='name'>{name}</div>
		<div className='email'>{email}</div>
	</div>
}

var comps = [
	comp('Mike', 'mike@server.com'),
	comp('John', 'john@server.com'),
	comp('Bob', 'bob@server.com'),
	comp('Max', 'max@server.com')
]

var example4 = <List items={comps} disabled={[2]} selected={[0]} onChange={console.log.bind(console)} />


/*
	EXAMPLE 5
*/

var CustomList = MakeList({
	keyboardEvents: false,
});

var example5 = <CustomList items={comps} disabled={[2]} selected={[0]} onChange={console.log.bind(console)} />


var Demo = React.createClass({
	render() {
		return <div className='demo'>
			<div>{example1} {example1multi}</div>
			<div className='context-menu'>{example3}</div>
			<div>{example4}</div>
			<div>{example5}</div>
		</div>
	}
})

var demo = document.createElement('div')
document.body.appendChild(demo)
React.render(<Demo />, demo)
