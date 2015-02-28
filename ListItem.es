import React from 'react'
import cx from 'classnames'

let ListItem = React.createClass({
	getDefaultProps() {
		return {
			disabled: false,
			selected: false,
			focused: false,
		}
	},
	render() {
		let classes = cx('react-list-select--item', {
			'is-disabled': this.props.disabled,
			'is-selected': this.props.selected,
			'is-focused': this.props.focused,
		})

		return <li className={classes}>
			<label>
				<input className="chkbox" type="checkbox"
					disabled={this.props.disabled}
					checked={this.props.selected}
					onChange={() => this.props.onChange(this.props.index)} />
				{this.props.children}
			</label>
		</li>
	}
})

export default ListItem
