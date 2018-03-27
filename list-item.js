import React from 'react'
import cx from 'classnames'

class ListItem extends React.Component {
	render() {
		let classes = cx('react-list-select--item', {
			'is-disabled': this.props.disabled,
			'is-selected': this.props.selected,
			'is-focused': this.props.focused,
		})

		return (
			<li
				className={classes}
				onMouseOver={() => this.props.onMouseOver(this.props.index)}
				onClick={event =>
					this.props.onChange({event, index: this.props.index})
				}
			>
				{this.props.children}
			</li>
		)
	}
}

ListItem.defaultProps = {
	disabled: false,
	selected: false,
	focused: false,
}

export default ListItem
