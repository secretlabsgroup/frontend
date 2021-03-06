import React, { useState, useEffect } from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const ALL_EVENTS_QUERY = gql`
  query ALL_EVENTS_QUERY(
    $location: String!
    $page: Int
    $categories: [String]
    $dates: [String]
    $genres: [String]
  ) {
    getEvents(
      location: $location
      page: $page
      categories: $categories
      dates: $dates
      genres: $genres
    ) {
      page_count
      total_items
      page_number
      page_total
      location
      genres
      categories
      dates
      events {
        id
        tmID
        title
        image_url
        times
        genre
        category
        city
        venue
        attending {
          id
          dob
          firstName
          img {
            id
            default
            img_url
          }
        }
      }
    }
  }
`

export const INITIAL_EVENTS_QUERY = gql`
  query INITIAL_EVENTS_QUERY($location: String) {
    getInitialEvents(location: $location) {
      id
      tmID
      title
      image_url
      times
      genre
      category
      city
      venue
      attending {
        id
        dob
        firstName
        img {
          id
          default
          img_url
        }
      }
    }
  }
`

const Events = ({ children, variables }) => {
  return (
    <Query query={ALL_EVENTS_QUERY} variables={variables}>
      {payload => children(payload)}
    </Query>
  )
}

export const getAllEvents = async (client, user, fetchPolicy) => {
  try {
    const response = await client.query({
      query: ALL_EVENTS_QUERY,
      variables: {
        location: user.location || 'Seattle, WA',
        page: 0,
        categories: [],
        genres: user.interests.map(x => x.tmID) || [],
        dates: []
      }
    })
    if (response) {
      return response
    }
  } catch (e) {
    console.log('hello', e)
    return {}
  }
}

export default Events
