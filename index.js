var classList = require('react-mixin-classlist')

var KEY = {
  UP: 38
, DOWN: 40
, ESC: 27
, ENTER: 13
, SPACE: 32
}

var KEYS = [38, 40, 27, 13, 32]

function noop () {}


var defaults = {
  items: []
, selected: []
, disabled: []
, multiple: false
, onChange: noop
}


var api = {
  select: function (index) {
    if (~this.state.disabled.indexOf(index)) return

    var multiple = this.props.multiple
    var selected = multiple ? this.state.selected.concat(index) : [index]

    this.setState({ selected: selected })
    this.props.onChange(multiple ? selected : index)
  }
, deselect: function (index) {
    var selected = this.state.selected
    var indexOf = selected.indexOf(index)

    selected.splice(indexOf, 1)

    this.setState({ selected: selected })
    this.props.onChange(this.props.multiple ? selected : null)
  }
, enable: function (index) {
    var disabled = this.state.disabled
    var indexOf = disabled.indexOf(index)

    disabled.splice(indexOf, 1)

    this.setState({ disabled: disabled })
  }
, disable: function (index) {
    this.setState({ disabled: this.state.disabled.concat(index) })
  }
, focusItem: function (index) {
    var focused = this.state.focused
    var disabled = this.state.disabled
    var last = this.state.items.length - 1

    if (index == 'next') {
      if (focused == null) {
        focused = 0
      }
      else {
        // focus first item if reached last item in the list
        focused = focused == last ? 0 : focused + 1

        // skip disabled items
        if (disabled.length) {
          while (~disabled.indexOf(focused)) {
            focused = focused == last ? 0 : focused + 1
          }
        }
      }
    }
    else if (index == 'previous') {
      if (focused == null) {
        focused = last
      }
      else {
        // focus last item if reached the top of the list
        focused = focused == 0 ? last : focused - 1

        // skip disabled items
        if (disabled.length) {
          while (~disabled.indexOf(focused)) {
            focused = focused == 0 ? last : focused - 1
          }
        }
      }
    }
    else if (!~disabled.indexOf(index)) {
      focused = index
    }

    this.setState({ focused: focused })
  }
, clear: function () {
    this.setState(defaults)
  }
}


var internals = {
  onKeyDown: function (event) {
    var key = event.keyCode

    if (key == KEY.UP) {
      this.focusItem('previous')
    }
    else if (key == KEY.DOWN) {
      this.focusItem('next')
    }
    else if (key == KEY.SPACE || key == KEY.ENTER) {
      this.toggleSelect(this.state.focused)
    }

    // prevent default behavior, in some situations pressing the key
    // up / down would scroll the browser window
    if (~KEYS.indexOf(key)) {
      event.preventDefault()
    }
  }
, toggleSelect: function (index) {
    if (!~this.state.selected.indexOf(index)) {
      this.select(index)
    }
    else if (this.props.multiple) {
      this.deselect(index)
    }
  }
}


module.exports = React.createClass({
  mixins: [classList, internals, api]
, getDefaultProps: function () {
    return defaults
  }
, getInitialState: function () {
    return {
      items: this.props.items
    , selected: this.props.selected
    , disabled: this.props.disabled
  }
  }
, componentWillReceiveProps: function (props) {
    this.setState({
      items: props.items
    , selected: props.selected
    , disabled: props.disabled
    })
  }
, render: function () {
    var component = this
    var items = this.state.items.map(renderItem, this)

    var settings = {
      tabIndex: 0
    , ref: 'list'
    , className: this.classList('react-list-select ' + (this.props.className || ''))
    , onKeyDown: this.onKeyDown
    }

    ;[
      'onBlur'
    , 'onFocus'
    , 'onMouseEnter'
    , 'onMouseLeave'
    ].forEach(function (method) {
      if (component.props[method]) {
        settings[method] = function (event) {
          component.props[method].call(component, event)
        }
      }
    })

    return React.DOM.b(settings, items)
  }
})


function renderItem (item, index) {
  var $this = this

  var classes = this.setClassIf({
    'is-disabled': ~this.state.disabled.indexOf(index)
  , 'is-selected': ~this.state.selected.indexOf(index)
  , 'is-focused': this.state.focused == index
  })

  var settings = {
    key: index
  , ref: '$' + index
  , className: 'react-list-select--item ' + classes
  , onMouseEnter: function () {
      if (~$this.state.disabled.indexOf(index)) return

      $this.setState({ focused: index })
    }
  , onClick: function (event) {
      $this.toggleSelect.call($this, index)
    }
  }

  return React.DOM.b(settings, item)
}