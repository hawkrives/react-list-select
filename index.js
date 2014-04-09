var mixinClassList = require('react-mixin-classlist')
var is = require('is-type')


var defaults = {
  className: 'react-list-select'
, focusOn: []
, focusItemOn: ['click']
, selectItemOn: ['click', 'space', 'enter']
, multiple: false
}

function getSelected (items) {
  var selected = null
  items.forEach(function (item) { item.selected && (selected = item) })
  return selected
}


module.exports = React.createClass({
  mixins: [mixinClassList]

, getDefaultProps: function () {
    return defaults
  }

, getInitialState: function () {
    return {
      items: this.props.items
    , previous: this.props.multiple ? null : getSelected(this.props.items)
    }
  }

, componentWillReceiveProps: function (props) {
    this.setState({
      items: props.items
    , previous: props.multiple ? null : getSelected(props.items)
    })
  }

, render: function () {
    var items = this.state.items.map(function (item, index) {
      var classes = this.setClassIf({
        'is-disabled': item.disabled
      , 'is-selected': item.selected
      , 'is-focused': item.focused
      })

      var settings = {
        className: 'react-list-select-item ' + classes
      , key: index
      , onClick: this.onClickItem.bind(this, item)
      , onDoubleClick: this.onClickItem.bind(this, item)
      , onMouseEnter: this.onMouseEnterItem.bind(this, item)
      }

      return React.DOM.b(settings, item.content)
    }, this)


    var settings = {
      className: this.classList(this.props.className)
    , ref: 'list'
    , tabIndex: 0
    , onKeyDown: this.onKeyDown
    , onBlur: this.onBlur
    , onMouseEnter: this.onMouseEnter
    }

    return React.DOM.b(settings, items)
  }

, onMouseEnter: function () {
    if (~this.props.focusOn.indexOf('mouseenter'))
      this.refs.list.getDOMNode().focus()
  }

, onClickItem: function (item, event) {
    if (item.disabled) return

    var type = event.type == 'click' ? 'click' : 'doubleclick'

    if (~this.props.focusItemOn.indexOf(type))
      this.focusItem(item)

    if (~this.props.selectItemOn.indexOf(type))
      this.selectItem(item)
  }

, onMouseEnterItem: function (item, event) {
    if (item.disabled) return

    if (~this.props.focusItemOn.indexOf('mouseenter'))
      this.focusItem(item)
  }

, onKeyDown: function (event) {
    var keys = {
      '38': 'up'
    , '40': 'down'
    , '27': 'esc'
    , '13': 'enter'
    , '32': 'space'
    }

    var key = keys[event.keyCode]

    if ('up' == key || 'down' == key)
      this.move(key)

    if (~this.props.selectItemOn.indexOf(key))
      this.selectItem(this.state.focusedItem)
  }

, onBlur: function (event) {
    if (~this.props.selectItemOn.indexOf('blur') && this.state.focusedItem)
      this.selectItem(this.state.focusedItem)
  }

, move: function (direction) {
    var items = this.state.items
    var indexOf = items.indexOf(this.state.focusedItem)

    function getItem () {
      if (direction == 'up')
        var index = (!~indexOf || !indexOf ? items.length - 1 : indexOf - 1)

      if (direction == 'down')
        var index = (!~indexOf || indexOf == items.length - 1 ? 0 : indexOf + 1)

      var item = items[index]

      // write new indexOf
      indexOf = items.indexOf(item)

      return item.disabled ? getItem() : item
    }

    this.focusItem(getItem())
  }

, position: function (x, y) {
    var node = this.refs.list.getDOMNode()
    node.style.top = y + 'px'
    node.style.left = x + 'px'
  }

, focusItem: function (item) {
    if (this.state.focusedItem)
      this.state.focusedItem.focused = false
    item.focused = true
    this.setState({ focusedItem: item })
  }

, selectItem: function (item) {
    if (this.state.previous)
      this.state.previous.selected = false

    item.selected = this.props.multiple ? !item.selected : true

    this.setState({ previous: this.props.multiple ? null : item })

    if (is.function(this.props.onSelect)) {
      function isSelected (item) { return item.selected }
      this.props.onSelect(this.state.items.filter(isSelected))
    }
  }

, clear: function () {
    var items = this.state.items.map(function (item) {
      item.selected = false
      return item
    })
    this.setState({ items: items })
  }
})