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

Select an item from the list
 - index - `4` array index


#### .deselect(index)

Deselect an item from the list
 - index - `4` array index


#### .disable(index)

Disable an item from the list to be selected or focused
 - index - `4` array index


#### .enable(index)

Re-enable a disabled item to be focused or selected
 - index - `4` array index


#### .focusItem(value)

Focus an item from the list

  - value
    + `3` - array index
    + `next` - focus next item from the list
    + `previous` - focus previous item from the list


#### .clear()

Reset list state


## License - MIT
