var List = require('../index.js')

var DIV = React.DOM.div



/*
    EXAMPLE 1
*/

function parseHash (hash, selected) {
  return Object.keys(hash).map(function (key) {
    return {
      key: key
    , content: hash[key]
    , selected: Array.isArray(selected) ? ~selected.indexOf(key) : selected == key
    }
  })
}

function onSelectHash (items) {
  items = items.map(function (item) { return item.key })
  console.log(items.length > 1 ? items : items[0])
}


var items = {
  'NY': 'New York'
, 'MN': 'Minnesota'
, 'SC': 'South Carolina'
, 'MO': 'Missouri'
, 'SD': 'South Dakota'
, 'DE': 'Delaware'
, 'MS': 'Mississippi'
, 'TN': 'Tennessee'
, 'FL': 'Florida'
, 'MT': 'Montana '
}

var example1 = List({
  items: parseHash(items, 'SD')
, onSelect: onSelectHash
})

var example1multi = List({
  items: parseHash(items, ['SD', 'DE', 'TN'])
, onSelect: onSelectHash
, multiple: true
})






/*
    EXAMPLE 3
*/

var items = [
  { content: 'New file', disabled: true }
, { content: 'New folder' }
, { content: 'Copy', selected: true }
, { content: 'Cut', disabled: true }
, { content: 'Paste', disabled: true }
, { content: 'Refresh', }
, { content: 'Open', }
, { content: 'Delete', disabled: true }
]

var example3 = List({
  items: items
, focusItemOn: ['mouseenter']
, onSelect: function (item) { alert('Some action') }
})





/*
    EXAMPLE 4
*/

function comp (name, email) {
  return DIV({ className: 'contact' }, [
    DIV({ className: 'name' }, name)
  , DIV({ className: 'email' }, email)
  ])
}

var comps = [
  { content: comp('Mike', 'mike@server.com') }
, { content: comp('John', 'john@server.com'), selected: true }
, { content: comp('Bob', 'bob@server.com'), disabled: true }
, { content: comp('Max', 'max@server.com') }
]

var example4 = List({
  items: comps
, onSelect: function (items) { console.log(items) }
, focusItemOn: ['mouseenter']
, focusOn: ['mouseenter']
})




var Demo = React.createClass({
  render: function () {
    return DIV({ className: 'demo' }, [
      DIV({}, [example1, example1multi])
    , DIV({}, [example3])
    , DIV({}, [example4])
    ])
  }
})

var demo = document.createElement('b')
document.body.appendChild(demo)
React.renderComponent(Demo(), demo)