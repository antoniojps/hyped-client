import axios from 'axios'
import { ENDPOINT } from '@/config'
import PUBG_PLAYER_QUERY from '../graphql/PubgPlayerName.gql'
import USER_PUBGNICK_ADD_MUTATION from '../graphql/UserPubgNickAdd.gql'

const ax = axios.create({
  baseURL: ENDPOINT,
  timeout: 1000,
  withCredentials: true,
})

export function logout () {
  return ax.get('/auth/logout')
}

export function queryPubgPlayerName (apolloClient, name) {
  return apolloClient.query({
    query: PUBG_PLAYER_QUERY,
    variables: { name },
  })
}

export function mutateUserPubgNickAdd (apolloClient, userId, pubgNick) {
  return apolloClient.mutate({
    mutation: USER_PUBGNICK_ADD_MUTATION,
    variables: {
      userId,
      pubgNick,
    },
  })
}
