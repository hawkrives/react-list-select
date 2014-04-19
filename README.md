# react-list-select

A list with selectable and keyboard navigable items. Useful as a dropdown (autocomplete), right click menu, or a simple list with actions triggered on item select - [example](http://rawgithub.com/navaru/react-list-select/master/example/index.html)


## Use:

```
var List = require('react-list-select')

var items = [
  'Google'
, 'TED'
, 'GitHub'
, 'Big Think'
, 'Microsoft'
]

var options = {
  items: items

// mark selected items
, selected: [0]

// mark disabled items
, disabled: [4]

// Enable multi-select
, multiple: true

// fired when items are selected or deselected
, onChange: function (selected) { ... }
}

React.renderComponent(List(options), document.body)
```


## API

#### .select(index)

 - `number` __index__ - _items_ array index

Select an item from the list



#### .deselect(index)

 - `number` __index__ - _items_ array index

Deselect an item from the list



#### .disable(index)

 - `number` __index__ - _items_ array index

Disable an item from the list to be selected or focused



#### .enable(index)

 - `number` __index__ - _items_ array index

Enable a disabled item to be focused or selected



#### .focusItem(value)

  - __value__
    + `number` __3__ - _items_ array index
    + `string` __next__ - focus next item from the list
    + `string` __previous__ - focus previous item from the list

Focus an item from the list



#### .clear()

Reset list state


## License - MIT
