# react-list-select

A list with selectable and keyboard navigable items. Useful as a dropdown (autocomplete), right click menu, or a simple list with actions triggered on item select.

View the [example](https://hawkrives.github.io/react-list-select/).


## Use:

```js
import List from 'react-list-select'

let items = [
  'Google',
  'TED',
  'GitHub',
  'Big Think',
  'Microsoft',
]

let list = (
  <List
    items={items}
    selected={[0]}
    disabled={[4]}
    multiple={true}
    onChange={(selected: number) => { console.log(selected) }}
  />
)

ReactDOM.renderComponent(list, document.getElementById('container'))
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


#### .focusNext()
focus next item from the list


#### .focusPrevious()
focus previous item from the list


#### .focusIndex(index)
- `number` __index__ - _items_ array index

Focus an item from the list

#### .clear()
Reset list state


## License - MIT
