import React, { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import withStyles from '@material-ui/core/styles/withStyles';
import { useMutation } from '../Mutations/useMutation';
import StyledFooter from '../../styledComponents/Footer/Footer.jsx';
import styles from '../../static/jss/material-kit-pro-react/views/componentsSections/footerStyle.jsx';
import List from '@material-ui/core/List';
import Button from '../../styledComponents/CustomButtons/Button.jsx';
import ListItem from '@material-ui/core/ListItem';
import Terms from './TermsModal';

const DELETE_USER = gql`
  mutation {
    deleteUser {
      message
    }
  }
`;

const Footer = (props) => {
  const [termsShowing, setTermsShowing] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER, { onCompleted: () => Router.push('/joinus') });

	const {classes, splash} = props;
  return (
    <StyledFooter
		stuff={props}
      theme='dark'
      content={
        <div>
          <div className={classes.left}>
            <div
              className={classes.footerBrand}
              style={{
                fontFamily: 'Baumans',
                fontSize: '24px',
                color: '#fafafa',
                lineHeight: 'normal'
              }}
            >
              <span style={{ color: '#4cb5ae' }}>Up</span>4
            </div>
          </div>
          <Button simple onClick={() => setTermsShowing(true)}>
            Our terms and privacy policy
          </Button>
          <Terms showing={termsShowing} setShowing={setTermsShowing} />
          {/* <div className={classes.pullCenter}>
						<List className={classes.list}>
							<ListItem className={classes.inlineBlock}>
								<a href='https://www.creative-tim.com/' className={classes.block}>
									Creative Tim
								</a>
							</ListItem>
							<ListItem className={classes.inlineBlock}>
								<a
									href='https://www.creative-tim.com/presentation'
									className={classes.block}
								>
									About us
								</a>
							</ListItem>
							<ListItem className={classes.inlineBlock}>
								<a href='//blog.creative-tim.com/' className={classes.block}>
									Blog
								</a>
							</ListItem>
							<ListItem className={classes.inlineBlock}>
								<a
									href='https://www.creative-tim.com/license'
									className={classes.block}
								>
									Licenses
								</a>
							</ListItem>
						</List>
					</div> */}
          <div className={classes.rightLinks}>
            <ul>
              <li>
                <Button
                  href='https://github.com/up4life'
                  color='twitter'
                  justIcon
                  simple='true'
                >
                  <i className='fab fa-github' />
                </Button>
              </li>
              {/* <li>
								<Button onClick={() => deleteUser()} color='google' justIcon simple>
									<i className='fab fa-google-plus-g' />
								</Button>
							</li> */}
              {/* <li>
								<Button
									href='https://dribbble.com/creativetim'
									color='dribbble'
									justIcon
									simple
								>
									<i className='fab fa-dribbble' />
								</Button>
							</li>
							<li>
								<Button
									href='https://instagram.com/CreativeTimOfficial'
									color='google'
									justIcon
									simple
								>
									<i className='fab fa-google-plus-g' />
								</Button>
							</li> */}
            </ul>
          </div>
        </div>
      }
    />
  );
};

export default withStyles(styles)(Footer);
