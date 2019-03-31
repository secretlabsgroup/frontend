import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
// core components

import mediaStyle from '../../static/jss/material-kit-pro-react/components/mediaStyle.jsx';

function Media({ ...props }) {
	const {
		classes,
		avatarLink,
		avatar,
		avatarAlt,
		currentUser,
		small,
		title,
		body,
		footer,
		avatarClick,
		innerMedias,
		...rest
	} = props;

	const yayclasses = classNames({
		[classes.media]: true,
		[classes.reverse]: currentUser,
	});
	return (
		<div {...rest} className={yayclasses}>
			<div className={classes.mediaLink}>
				<div
					style={{ cursor: !currentUser ? 'pointer' : 'default' }}
					className={small ? classes.smallAvatar : classes.mediaAvatar}
					onClick={avatarClick}
				>
					<img src={avatar} alt={avatarAlt} />
				</div>
				<div className={classes.mediaFooter}>{footer}</div>
			</div>
			<div className={currentUser ? classes.otherBody : classes.mediaBody}>
				{title !== undefined ? <h4 className={classes.mediaHeading}>{title}</h4> : null}
				{body}

				{innerMedias !== undefined ? (
					innerMedias.map((prop, key) => {
						return prop;
					})
				) : null}
			</div>
		</div>
	);
}

Media.defaultProps = {
	avatarLink: '#',
	avatarAlt: '...',
	currentUser: false,
};

Media.propTypes = {
	avatarLink: PropTypes.string,
	currentUser: PropTypes.bool,
	avatar: PropTypes.string,
	avatarAlt: PropTypes.string,
	title: PropTypes.node,
	body: PropTypes.node,
	footer: PropTypes.node,
	avatarClick: PropTypes.func,
	innerMedias: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(mediaStyle)(Media);
