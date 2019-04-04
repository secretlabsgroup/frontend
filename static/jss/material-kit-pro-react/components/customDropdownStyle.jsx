import {
	defaultFont,
	primaryColor,
	primaryBoxShadow,
	infoColor,
	infoBoxShadow,
	successColor,
	successBoxShadow,
	warningColor,
	warningBoxShadow,
	dangerColor,
	title,
	dangerBoxShadow,
	roseColor,
	roseBoxShadow,
} from '../../material-kit-pro-react';

const customDropdownStyle = theme => ({
	popperClose: {
		pointerEvents: 'none',
		display: 'none !important',
	},
	pooperNav: {
		[theme.breakpoints.down('sm')]: {
			position: 'static !important',
			left: 'unset !important',
			top: 'unset !important',
			transform: 'none !important',
			willChange: 'none !important',
			'& > div': {
				boxShadow: 'none !important',
				marginLeft: '1.5rem',
				marginRight: '1.5rem',
				transition: 'none !important',
				marginTop: '0px !important',
				marginBottom: '5px !important',
				padding: '0px !important',
			},
		},
	},
	manager: {
		'& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child': {
			width: '100%',
		},
	},
	chatManager: {
		'& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child': {
			width: '100%',
		},
		position: 'fixed',
		right: '30px',
		zIndex: 10,
		bottom: '30px',
	},
	innerManager: {
		display: 'block',

		'& > div > button,& > div > a': {
			margin: '0px !important',
			color: 'inherit !important',
			padding: '10px 20px !important',
			'& > span:first-child': {
				width: '100%',
				justifyContent: 'flex-start',
			},
		},
	},
	target: {
		'& > button:first-child > span:first-child, & > a:first-child > span:first-child': {
			display: 'inline-block',
		},
		'& $caret': {
			marginLeft: '0px',
		},
	},
	dropdown: {
		borderRadius: '3px',
		color: '#fafafa !important',
		border: '0',
		boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
		border: '1px solid #b2ddf7',
		borderRadius: '6px',
		top: '100%',
		zIndex: '1000',
		minWidth: '100px',
		padding: '5px 0',
		margin: '2px 0 0',
		fontSize: '14px',
		textAlign: 'left',
		listStyle: 'none',
		backgroundColor: '#242121',
		backgroundClip: 'padding-box',
		backgroundImage: 'url(https://www.transparenttextures.com/theme/images/transparent.png)',
		'& li': {
			color: '#fafafa',
		},
		'& small': {
			color: '#fafafa',
		},
	},
	msgdd: {
		color: '#fafafa !important',
		minWidth: '200px',
		maxWidth: '200px',
		borderRadius: '3px',
		border: '0',
		overflowY: 'scroll',
		// boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',  we might need this *fingers crossed*
		boxShadow: '0 14px 18px rgba(0,0,0, 0.7)',
		border: '1px solid #b2ddf7',
		borderRadius: '6px',
		top: '100%',
		zIndex: '1200',
		padding: '5px 0',
		margin: '2px 0 0',
		fontSize: '14px',
		textAlign: 'left',
		listStyle: 'none',
		backgroundColor: '#242121',
		minWidth: '350px',
		backgroundImage: 'url(https://www.transparenttextures.com/theme/images/transparent.png)',
		'& div': {
			color: '#fafafa',
		},
		'& small': {
			color: '#fafafa',
		},
		'& img': {
			borderRadius: '6px !important',
		},
	},
	menuList: {
		padding: '0',
	},
	pooperResponsive: {
		zIndex: '1200',
		[theme.breakpoints.down('sm')]: {
			zIndex: '1640',
			position: 'static',
			float: 'none',
			width: 'auto',
			marginTop: '0',
			backgroundColor: 'transparent',
			border: '0',
			boxShadow: 'none',
			color: 'black',
		},
	},
	dropdownItem: {
		...defaultFont,
		fontSize: '13px',
		padding: '10px 20px',
		margin: '0 5px',
		borderRadius: '2px',
		position: 'relative',
		transition: 'all 150ms linear',
		display: 'block',
		clear: 'both',
		fontWeight: '400',
		height: '100%',
		color: '#333',
		whiteSpace: 'nowrap',
	},
	msgddi: {
		...defaultFont,
		fontSize: '13px',
		padding: '10px 0px',
		margin: '0 5px',
		borderRadius: '2px',
		position: 'relative',

		transition: 'all 150ms linear',
		display: 'block',
		clear: 'both',
		fontWeight: '400',
		height: '100%',
		color: '#333',
		whiteSpace: 'nowrap',
	},
	darkHover: {
		'&:hover': {
			boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)',
			backgroundColor: '#212121',
			color: '#fff',
		},
	},
	primaryHover: {
		'&:hover': {
			backgroundColor: '#191919',
			//   border: "1px solid #81d6e3",
			//   padding: '-1px',
			color: '#FFFFFF',
			//   ...primaryBoxShadow
		},
	},
	infoHover: {
		'&:hover': {
			backgroundColor: infoColor,
			color: '#FFFFFF',
			...infoBoxShadow,
		},
	},
	successHover: {
		'&:hover': {
			backgroundColor: successColor,
			color: '#FFFFFF',
			...successBoxShadow,
		},
	},
	warningHover: {
		'&:hover': {
			backgroundColor: warningColor,
			color: '#FFFFFF',
			...warningBoxShadow,
		},
	},
	dangerHover: {
		'&:hover': {
			backgroundColor: dangerColor,
			color: '#FFFFFF',
			...dangerBoxShadow,
		},
	},
	roseHover: {
		'&:hover': {
			backgroundColor: roseColor,
			color: '#FFFFFF',
			...roseBoxShadow,
		},
	},
	dropdownItemRTL: {
		textAlign: 'right',
	},
	dropdownDividerItem: {
		margin: '5px 0',
		backgroundColor: 'rgba(0, 0, 0, 0.12)',
		height: '1px',
		overflow: 'hidden',
	},
	buttonIcon: {
		width: '20px',
		height: '20px',
	},
	caret: {
		transition: 'all 150ms ease-in',
		display: 'inline-block',
		width: '0',
		height: '0',
		marginLeft: '4px',
		verticalAlign: 'middle',
		borderTop: '4px solid',
		borderRight: '4px solid transparent',
		borderLeft: '4px solid transparent',
	},
	caretActive: {
		transform: 'rotate(90deg)',
	},
	caretDropup: {
		transform: 'rotate(180deg)',
	},
	caretRTL: {
		marginRight: '4px',
	},
	dropdownHeader: {
		display: 'block',
		padding: '0.1875rem 1.25rem',
		fontSize: '0.75rem',
		lineHeight: '1.428571',
		color: '#777',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		whiteSpace: 'nowrap',
		fontWeight: 'inherit',
		marginTop: '10px',
		'&:hover,&:focus': {
			backgroundColor: 'transparent',
			cursor: 'auto',
		},
	},
	messagesHeader: {
		display: 'block',
		padding: '0.1875rem 1.25rem',
		fontSize: '0.75rem',
		lineHeight: '1.428571',
		color: '#777',
		whiteSpace: 'nowrap',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		fontWeight: 'inherit',
		//marginTop: '10px',
		backgroundImage:
			'linear-gradient(to right, #81d6e3, #78d5e3, #6ed4e3, #63d2e4, #57d1e4, #4fd0e4, #45cee4, #3acde4, #32cce4, #28cbe5, #1ac9e5, #02c8e6)',
		background: 'transparent',
		'&:hover,&:focus': {
			backgroundColor: 'transparent',
			cursor: 'auto',
		},
	},
	noLiPadding: {
		padding: '0',
	},
	smallHeading: {
		...title,
		fontSize: '14px',
		marginTop: '3px',
		minHeight: '20px',
		marginBottom: '0',
		'& small': {
			fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		},
	},
});

export default customDropdownStyle;
