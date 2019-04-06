import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
// core components
import Button from '../CustomButtons/Button';

import customDropdownStyle from '../../static/jss/material-kit-pro-react/components/customDropdownStyle.jsx';

class CustomDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCloseMenu = this.handleCloseMenu.bind(this);
	}

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
	};
	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};
	handleCloseMenu(param) {
		this.setState({ open: false });
		if (this.props && this.props.onClick) {
			this.props.onClick(param);
		}
	}
	render() {
		const { open } = this.state;
		const {
			classes,
			buttonText,
			buttonIcon,
			dropdownList,
			buttonProps,
			dropup,
			dropdownHeader,
			caret,
			hoverColor,
			dropPlacement,
			messages,
			rtlActive,
			noLiPadding,
			stuff,
			innerDropDown,
			navDropdown,
			...rest
		} = this.props;
		const caretClasses = classNames({
			[classes.caret]: true,
			[classes.caretDropup]: dropup && !open,
			[classes.caretActive]: open && !dropup,
			[classes.caretRTL]: rtlActive,
		});
		const dropdownItem = classNames({
			[classes.dropdownItem]: !messages,
			[classes.msgddi]: messages,
			[classes[hoverColor + 'Hover']]: true,
			[classes.noLiPadding]: noLiPadding,
			[classes.dropdownItemRTL]: rtlActive,
		});
		const dropDownMenu = (
			<div>
				<MenuList role='menu' className={classes.menuList}>
					{dropdownHeader !== undefined ? (
						<MenuItem
							onClick={() => this.handleCloseMenu(dropdownHeader)}
							className={messages ? classes.messagesHeader : classes.dropdownHeader}
						>
							{dropdownHeader}
						</MenuItem>
					) : null}
					<div style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '30px' }}>
						{dropdownList.map((prop, key) => {
							if (prop.divider) {
								return (
									<Divider
										key={key}
										onClick={() => this.handleCloseMenu('divider')}
										className={classes.dropdownDividerItem}
									/>
								);
							} else if (prop.props && prop.props.rep === 'multi') {
								return (
									<MenuItem
										key={key}
										className={dropdownItem}
										style={{ overflow: 'visible', padding: 0 }}
									>
										{prop}
									</MenuItem>
								);
							}
							return (
								<MenuItem
									key={key}
									onClick={() => this.handleCloseMenu(prop)}
									className={dropdownItem}
								>
									{prop}
								</MenuItem>
							);
						})}
					</div>
				</MenuList>
			</div>
		);

		const otherThing = (
			<div>
				<MenuList role='menu' className={classes.menuList}>
					{dropdownHeader !== undefined ? (
						<MenuItem
							onClick={() => this.handleCloseMenu(dropdownHeader)}
							className={messages ? classes.messagesHeader : classes.dropdownHeader}
						>
							{dropdownHeader}
						</MenuItem>
					) : null}
				</MenuList>
				<div
					style={{ maxHeight: '300px', height: '300px', overflowY: 'scroll', marginTop: '30px' }}
				>
					{stuff}
				</div>
			</div>
		);
		return (
			<div className={messages ? classes.chatManager : classes.manager}>
				<div className={buttonText !== undefined ? '' : classes.target}>
					<Button
						aria-label='Notifications'
						aria-owns={open ? 'menu-list' : null}
						aria-haspopup='true'
						buttonRef={node => {
							this.anchorEl = node;
						}}
						{...buttonProps}
						onClick={this.handleClick}
					>
						{buttonIcon !== undefined ? (
							<this.props.buttonIcon className={classes.buttonIcon} />
						) : null}
						{buttonText !== undefined ? buttonText : null}
						{caret ? <b className={caretClasses} /> : null}
					</Button>
				</div>
				<Popper
					open={open}
					anchorEl={this.anchorEl}
					transition
					disablePortal
					placement={dropPlacement}
					className={classNames({
						[classes.popperClose]: !open,
						[classes.pooperResponsive]: true,
						[classes.pooperNav]: open && navDropdown,
					})}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							in={open}
							ref={rest.forwardRef}
							id='menu-list'
							style={dropup ? { transformOrigin: '0 100% 0' } : { transformOrigin: '0 0 0' }}
						>
							<Paper className={messages ? classes.msgdd : classes.dropdown}>
								{stuff ? (
									<ClickAwayListener onClickAway={this.handleClose} ref='cacat'>
										{otherThing}
									</ClickAwayListener>
								) : innerDropDown ? (
									dropDownMenu
								) : (
									<ClickAwayListener onClickAway={this.handleClose} ref='cacat'>
										{dropDownMenu}
									</ClickAwayListener>
								)}
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		);
	}
}

CustomDropdown.defaultProps = {
	caret: true,
	dropup: false,
	hoverColor: 'primary',
};

CustomDropdown.propTypes = {
	classes: PropTypes.object.isRequired,
	hoverColor: PropTypes.oneOf([
		'dark',
		'primary',
		'info',
		'success',
		'warning',
		'danger',
		'rose',
	]),
	buttonText: PropTypes.node,
	buttonIcon: PropTypes.func,
	dropdownList: PropTypes.array,
	buttonProps: PropTypes.object,
	dropup: PropTypes.bool,
	dropdownHeader: PropTypes.node,
	rtlActive: PropTypes.bool,
	caret: PropTypes.bool,
	dropPlacement: PropTypes.oneOf([
		'bottom',
		'top',
		'right',
		'left',
		'bottom-start',
		'bottom-end',
		'top-start',
		'top-end',
		'right-start',
		'right-end',
		'left-start',
		'left-end',
	]),
	noLiPadding: PropTypes.bool,
	innerDropDown: PropTypes.bool,
	navDropdown: PropTypes.bool,
	// This is a function that returns the clicked menu item
	onClick: PropTypes.func,
	messages: PropTypes.bool,
};

export default withStyles(customDropdownStyle)(CustomDropdown);
