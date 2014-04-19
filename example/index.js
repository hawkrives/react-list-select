var List = require('../index.js')

var DIV = React.DOM.div


/*
    EXAMPLE 1
*/



var hashmap = {
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

var keys = Object.keys(hashmap)

var items = keys.map(function (key) { return hashmap[key] })

var example1 = List({
  items: items
, selected: [3]
, disabled: [0,4,6,7,9]
, onMouseEnter: function (event) {
    this.refs.list.getDOMNode().focus()
  }
})

var example1multi = List({
  items: items
, selected: [2,4,6]
, multiple: true
, onMouseEnter: function (event) {
    this.refs.list.getDOMNode().focus()
  }
})




/*
    EXAMPLE 3
*/

var items = [
  'New file'
, 'New folder'
, 'Copy'
, 'Cut'
, 'Paste'
, 'Refresh'
, 'Open'
, 'Delete'
]

var example3 = List({
  items: items
, disabled: [3, 7]
, onMouseEnter: function (event) {
    this.refs.list.getDOMNode().focus()
  }
, onChange: function (selected) {

  }
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
  comp('Mike', 'mike@server.com')
, comp('John', 'john@server.com')
, comp('Bob', 'bob@server.com')
, comp('Max', 'max@server.com')
]

var example4 = List({
  items: comps
, disabled: [2]
, selected: [0]
, onChange: function (selected) {
    console.log(selected)
  }
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