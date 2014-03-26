# react-list-select

A list with selectable and keyboard navigable items. Useful as a dropdown (autocomplete), right click menu, or a simple list with actions triggered on item select - [example](http://rawgithub.com/navaru/react-list-select/master/example/index.html)


## Use:

```
var List = require('react-list-select')

var options = {
// Focus list or item on event - default: ['click']
// ''
  focusOn: ['click', 'mouseenter']
, focusItemOn: ['click', 'mouseenter']

// Default: ['click', 'space', 'enter']
, selectItemOn: ['click', 'space', 'enter', 'blur']

// Enable multi-select
, multiple: true

// Triggered when an item is selected
, onSelect: function (item) {}

// To access methods on list:
// this.refs.list.move('up') - focus items up/down
// this.refs.list.position(top, left)
// this.refs.list.clear() - clear selection
, ref: 'list'
}

React.renderComponent(List(options), document.body)
```



### Items

Items have the following format:

```
var items = [{
// the things that will be displayed, could be a string or a React Component
  content: ''
, selected: true
, disabled: false
}]

```


## License - MIT
