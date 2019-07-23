import React, { useState, Fragment } from 'react'

import { withRouter } from 'next/router'

import classNames from 'classnames'
//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import { IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

//Q&M
import User from '../Queries/User'

//components

import MenuDrawer from './Drawer'
import UserModal from '../UserModal/'
import Dates from './Dates'
import Messages from './Chats/ChatList'
import Settings from './Settings'
import Billing from './Pricing'
import Footer from '../Footer'
//styledcomponents

//utils

//styles
import style from '../../static/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx'

import bgImg from '../../static/img/shattered-dark.png'

function getContent(slug, user) {
  switch (slug) {
    case 'me':
      return <Settings currentUser={user} />
    case 'events':
      return <Dates user={user} />
    case 'chats':
      return <Messages user={user} />
    case 'billing':
      return <Billing currentUser={user} />
    default:
      return <Settings currentUser={user} />
  }
}

const Profile = ({ classes, theme, router: { query } }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <User>
      {({ data: { currentUser } }) => (
        <div
          className={classes.profileDrawer}
          style={{
            backgroundColor: '#000',
            height: '100%',

            backgroundImage: `url(${bgImg})`
          }}
        >
          {query.user && <UserModal user={query.user} currentUser={currentUser} />}
          <MenuDrawer user={currentUser} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          {/* <IconButton
				// color="inherit"
				style={{ color: 'white', position: 'absolute' }}
				aria-label='Open drawer'
				onClick={() => setDrawerOpen(!drawerOpen)}
				className={classNames(classes.menuButton)}
			> */}
          {/* <Menu />
			</IconButton> */}
          <div
            style={{
              minHeight: 'calc(100vh - 95px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginLeft: '80px'
            }}
          >
            {getContent(query.slug, currentUser)}
            <Footer />
          </div>
        </div>
      )}
    </User>
  )
}

export default withRouter(withStyles(style)(Profile))
