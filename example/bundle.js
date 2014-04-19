(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    , DIV({ className: 'context-menu' }, [example3])
    , DIV({}, [example4])
    ])
  }
})

var demo = document.createElement('b')
document.body.appendChild(demo)
React.renderComponent(Demo(), demo)
},{"../index.js":2}],2:[function(require,module,exports){
var classList = require('react-mixin-classlist')

var B = React.DOM.b
var I = React.DOM.i

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
    var index = this.state.focused

    if (key == KEY.UP) {
      this.focusItem('previous')
    }
    else if (key == KEY.DOWN) {
      this.focusItem('next')
    }
    else if (key == KEY.SPACE || key == KEY.ENTER) {
      if (!~this.state.selected.indexOf(index)) {
        this.select(index)
      }
      else {
        this.deselect(index)
      }
    }

    // prevent default behavior, in some situations pressing the key
    // up / down would scroll the browser window
    if (~KEYS.indexOf(key)) {
      event.preventDefault()
    }
  }
}


module.exports = React.createClass({
  mixins: [classList, internals, api]
, getDefaultProps: function () {
    return defaults
  }
, getInitialState: function () {
    return this.props
  }
, componentWillReceiveProps: function (props) {
    this.setState(props)
  }
, render: function () {
    var items = this.state.items.map(renderItem, this)

    var settings = {
      tabIndex: 0
    , ref: 'list'
    , className: this.classList('react-list-select ' + this.props.className || '')
    , onKeyDown: this.onKeyDown
    }

    ;[
      'onBlur'
    , 'onFocus'
    , 'onMouseEnter'
    , 'onMouseLeave'
    ].forEach(function (method) {
      if (this.props[method]) {
        settings[method] = this.props[method].bind(this)
      }
    }, this)

    return B(settings, items)
  }
})


function renderItem (item, index) {
  var classes = this.setClassIf({
    'is-disabled': ~this.state.disabled.indexOf(index)
  , 'is-selected': ~this.state.selected.indexOf(index)
  , 'is-focused': this.state.focused == index
  })

  return (
    B({
      key: index
    , ref: '$' + index
    , className: 'react-list-select--item ' + classes

    , onMouseEnter: function () {
        if (~this.state.disabled.indexOf(index)) return

        this.setState({ focused: index })
      }.bind(this)

    , onClick: function (event) {
        if (~this.state.selected.indexOf(index)) {
          this.deselect(index)
        }
        else {
          this.select(index)
        }
      }.bind(this)
    }, item)
  )
}
},{"react-mixin-classlist":3}],3:[function(require,module,exports){
module.exports = {
  getInitialState: function () {
    return { classList: [] }
  }

, addClass: function (name) {
    if (this.hasClass(name)) return

    var classList = this.state.classList
    classList.push(name)

    this.setState({ classList: classList })
  }

, removeClass: function (name) {
    if (!this.hasClass(name)) return

    var classList = this.state.classList
    classList.splice(classList.indexOf(name), 1)

    this.setState({ classList: classList })
  }

, hasClass: function (name) {
    return !!~this.state.classList.indexOf(name)
  }

, toggleClass: function (name) {
    (this.hasClass(name) ? this.removeClass(name) : this.addClass(name))
  }

, setClassIf: function (hash, returnArray) {
    var classes = []

    Object.keys(hash).forEach(function(name) {
      hash[name] && classes.push(name)
    })

    return returnArray ? classes : classes.join(' ')
  }

, classList: function (newClasses) {
    var classList = this.state.classList.join(' ').split(' ')

    if (newClasses) {
      // enable to pass new classes as a string also
      if ('string' === typeof newClasses)
        newClasses = newClasses.split(' ')

      // handle conditional classes
      if (!Array.isArray(newClasses))
        newClasses = this.setClassIf(newClasses, true)

      for (var i = 0; i < newClasses.length; ++i)
        if (!~classList.indexOf(newClasses[i]))
          classList.push(newClasses[i])
    }

    return classList.join(' ')
  }
}
},{}]},{},[1])