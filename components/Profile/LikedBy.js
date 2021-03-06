import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import Router from 'next/router'
import { Favorite } from '@material-ui/icons'
import { LIKED_BY_QUERY } from '../Queries/LikedBy'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/jss/material-kit-pro-react/views/componentsSections/javascriptStyles'

const LikedBy = ({ user, classes }) => {
  const { data } = useQuery(LIKED_BY_QUERY, { pollInterval: 6000 })

  const hidden = user.permissions === 'FREE'
  if (!data.getLikedByList || !data.getLikedByList.length) return null
  return (
    <div>
      <svg
        style={{ width: 0, height: 0, position: 'absolute' }}
        aria-hidden="true"
        focusable="false"
      >
        <linearGradient id="favoriteID" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8A8A" />
          <stop offset="50%" stopColor="#FF545F" />
          <stop offset="100%" stopColor="#ff101f" />
        </linearGradient>
      </svg>
      {hidden ? (
        <h5 style={{ color: '#fafafa' }}>
          {data.getLikedByList.length} user{' '}
          <Favorite
            style={{ position: 'relative', top: '10px' }}
            className={classes.userFavorite}
          />
          's you!{' '}
          <span
            style={{ cursor: 'pointer', color: '#ff101f' }}
            onClick={() =>
              Router.push('/profile?slug=billing', '/profile/billing', {
                shallow: true
              })
            }
          >
            Go Pro
          </span>{' '}
          to see them.
        </h5>
      ) : (
        <h5 style={{ color: '#fafafa' }}>
          {data.getLikedByList.length} user{' '}
          <Favorite
            style={{ position: 'relative', top: '10px' }}
            className={classes.userFavorite}
          />
          's you!
        </h5>
      )}
      <div className={classes.likedByWrapper}>
        {data.getLikedByList.map(usr => (
          <img
            key={usr.id}
            src={usr.img.find(x => x.default).img_url}
            className={hidden ? classes.likedUserHiddenImg : classes.likedUserImg}
            onClick={() => {
              if (!hidden) {
                Router.push(
                  `/profile?slug=chats&user=${usr.id}`,
                  `/profile/chat/user/${usr.id}`,
                  { shallow: true },
                  { scroll: false }
                )
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default withStyles(styles)(LikedBy)
