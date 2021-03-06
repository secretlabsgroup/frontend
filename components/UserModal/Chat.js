import React, { useState, useEffect, useRef, Fragment } from 'react'
import NProgress from 'nprogress'
import moment from 'moment'
import Router from 'next/router'
import gql from 'graphql-tag'

//import withStyles from '@material-ui/core/styles/withStyles';
import { Send } from '@material-ui/icons'

import { Mutation, withApollo } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'

// import { SEND_MESSAGE_MUTATION } from '../Mutations/sendMessage';
import Verify from '../verifyPhone'
import CustomInput from '../../styledComponents/CustomInput/CustomInput.jsx'
import Media from '../../styledComponents/Media/Media.jsx'
import Button from '../../styledComponents/CustomButtons/Button'
import { ButtonBase, Tooltip, withStyles } from '@material-ui/core'
import TextareaAutosize from 'react-autosize-textarea'
import date from '../../utils/formatDate'

import styles from '../../static/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.jsx'

const TOGGLE_TYPING_MUTATION = gql`
  mutation TOGGLE_TYPING_MUTATION($chatId: String!, $isTyping: Boolean!) {
    toggleTyping(chatId: $chatId, isTyping: $isTyping) {
      typing {
        id
        firstName
      }
    }
  }
`

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($id: String!, $message: String!) {
    sendMessage(id: $id, message: $message) {
      id
      users {
        id
        firstName
        img {
          id
          img_url
          default
        }
      }
      messages {
        id
        text
        seen
        createdAt
        from {
          id
          firstName
          img {
            id
            img_url
            default
          }
        }
        updatedAt
      }
    }
  }
`

const MARK_SEEN = gql`
  mutation MARK_SEEN($chatId: String!) {
    markAllAsSeen(chatId: $chatId) {
      id
    }
  }
`

const REMAINING_MESSAGES = gql`
  query {
    remainingMessages
  }
`

const Chat = ({ classes, data, id, currentUser, match, client, refetch }) => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const markAllAsSeen = useMutation(MARK_SEEN)
  const msgRef = useRef(null)

  // flop this lil guy
  //currentUser.verified = true;
  //currentUser.permissions = 'yay';

  const [isTyping, setIsTyping] = useState(false)
  const toggleTyping = useMutation(TOGGLE_TYPING_MUTATION)

  useEffect(() => {
    if (data.getConversation) {
      return () =>
        toggleTyping({
          variables: {
            chatId: data.getConversation.id,
            isTyping: false
          }
        })
    }
  }, [])

  useEffect(() => {
    if (isTyping && !message.trim() && data.getConversation) {
      toggleTyping({
        variables: {
          chatId: data.getConversation.id,
          isTyping: false
        }
      })
      setIsTyping(false)
    }
    if (!isTyping && message.trim() && data.getConversation) {
      toggleTyping({
        variables: {
          chatId: data.getConversation.id,
          isTyping: true
        }
      })
      setIsTyping(true)
    }
  }, [message])

  useEffect(() => {
    // subscribeToNewMessages();
    // if (!currentUser.verified) {
    // 	setError({
    // 		msg: 'You must verify your account before you can send messages!',
    // 		link: null,
    // 		linkText: 'Verify now?',
    // 	});
    // } else
    if (currentUser.permissions === 'FREE') {
      getRemainingMessages()
    }
  }, [])
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight
    }
  }, [data.getConversation])
  useEffect(() => {
    const unSeen =
      data &&
      data.getConversation &&
      data.getConversation.messages.filter(msg => !msg.seen && msg.from.id !== currentUser.id)

    if (unSeen && unSeen.length > 0) {
      markAllAsSeen({
        variables: {
          chatId: data.getConversation.id
        }
      })
    }
  })
  const getRemainingMessages = async () => {
    let messagesRemaining = await client.query({
      query: REMAINING_MESSAGES,
      fetchPolicy: 'no-cache'
    })
    console.log(messagesRemaining)
    if (messagesRemaining.data.remainingMessages === 0) {
      setError({
        msg: 'You are out of weekly messages allowed on a free account!',
        link: '/profile/billing',
        linkText: 'Go Pro?'
      })
    }
  }
  function groupByUser(messages) {
    const grouped = []
    let fromSameUser = [messages[0]]
    let user = messages[0].from.id

    for (let i = 1; i < messages.length; i++) {
      if (messages[i].from.id !== user) {
        grouped.push(fromSameUser)
        fromSameUser = [messages[i]]
        user = messages[i].from.id
      } else {
        fromSameUser.push(messages[i])
      }
    }

    grouped.push(fromSameUser)
    return grouped
  }

  let messages =
    data.getConversation && data.getConversation.messages.length
      ? groupByUser(data.getConversation.messages)
      : null
  let lastSeenMessage = data.getConversation
    ? [...data.getConversation.messages].reverse().find(x => x.from.id === currentUser.id && x.seen)
    : null

  return (
    <div className={classes.chatBorder}>
      <div className={classes.chat} ref={msgRef}>
        {messages ? (
          messages.map((msg, i) => {
            let fromMatch = msg[0].from.id === id
            let unseen = !msg[0].seen && msg[0].from.id !== currentUser.id
            let img = msg[0].from.img.find(img => img.default).img_url
            return (
              <Media
                currentUser={!fromMatch}
                key={msg[0].id}
                avatar={img}
                title={
                  <span style={{ color: '#fafafa' }}>
                    {msg[0].from.firstName}
                    <small
                      style={{
                        fontWeight: unseen && 'bold',
                        fontSize: '12px'
                      }}
                    >
                      {/* · {moment(msg.createdAt).fromNow()} */}
                      {unseen ? <span style={{ color: 'red', marginLeft: '6px' }}>new</span> : null}
                    </small>
                  </span>
                }
                body={
                  <span>
                    {msg.map((m, i) => {
                      return (
                        <div key={m.id}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              flexDirection: fromMatch ? 'row' : 'row-reverse'
                            }}
                          >
                            <Tooltip
                              title={date(m.createdAt)}
                              placement={fromMatch ? 'bottom-start' : 'bottom-end'}
                            >
                              <p
                                style={{
                                  wordBreak: 'break-word',
                                  fontSize: '14px',
                                  cursor: 'default'
                                }}
                              >
                                {m.text}
                              </p>
                            </Tooltip>
                            <small
                              style={{
                                marginBottom: '10px',
                                marginLeft: '5px',
                                marginRight: '5px',
                                display: 'none'
                              }}
                            >
                              {' '}
                              {/* //{moment(msg.createdAt).fromNow()} */}
                            </small>
                          </div>
                          {currentUser.permissions !== 'FREE' &&
                          !fromMatch &&
                          lastSeenMessage &&
                          lastSeenMessage.id === m.id ? (
                            <div>
                              <small>
                                <span style={{ marginRight: '2px' }}>seen</span>
                                {date(lastSeenMessage.updatedAt)}
                              </small>
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                  </span>
                }
              />
            )
          })
        ) : (
          <h4 style={{ color: '#fafafa', fontStyle: 'italic' }}>
            No message history to show with {match.firstName}.<br /> Send a message to see what{' '}
            {match.firstName} is up4!
          </h4>
        )}
      </div>
      <Mutation
        mutation={SEND_MESSAGE_MUTATION}
        variables={{ id, message }}
        onCompleted={e => {
          if (currentUser.permissions === 'FREE') {
            console.log('hi')
            getRemainingMessages()
          }
          refetch()

          NProgress.done()
        }}
        onError={e => {
          console.log(e)
          NProgress.done()
        }}
      >
        {sendMessage =>
          error ? (
            !error.link ? (
              <Verify />
            ) : (
              <div>
                <h4>{error.msg}</h4>
                <Button onClick={() => Router.push('/profile?slug=billing', error.link)}>
                  {error.linkText}
                </Button>
              </div>
            )
          ) : (
            <form
              className={classes.expandedChat}
              onSubmit={e => {
                e.preventDefault()
                NProgress.start()
                sendMessage()

                setMessage('')
              }}
            >
              <TextareaAutosize
                className={classes.textareaAutosize}
                onChange={e => setMessage(e.target.value)}
                onFocus={() => console.log('isTyping')}
                onBlur={() => console.log('isNotTyping')}
                placeholder={
                  data.getConversation
                    ? `Respond to ${match.firstName}`
                    : `Send ${match.firstName} a message.`
                }
                rows={1}
                maxRows={4}
                value={message}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    sendMessage()
                    setMessage('')
                  }
                }}
              />
              <ButtonBase type="submit">
                <Button
                  style={{
                    background: 'transparent',
                    borderRadius: '6px !important'
                  }}
                  justIcon
                  className={classes.floatRight}
                  component="div"
                >
                  <Send />
                </Button>
              </ButtonBase>
            </form>
          )
        }
      </Mutation>
      {data.getConversation && (
        <div>
          {data.getConversation.typing.find(user => user.firstName === match.firstName)
            ? `${match.firstName} is typing...`
            : ''}
        </div>
      )}
    </div>
  )
}

export default withApollo(withStyles(styles)(Chat))
