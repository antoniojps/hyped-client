import axios from 'axios'
import { ENDPOINT } from '@/config'
import PUBG_PLAYER_QUERY from '../graphql/PubgPlayerName.gql'
import USER_PUBGNICK_ADD_MUTATION from '../graphql/UserPubgNickAdd.gql'
import USER_UPDATE_MUTATION from '../graphql/UserUpdate.gql'
import TEAM_ADD_MUTATION from '../graphql/TeamAdd.gql'
import TEAM_PLAYER_ADD_MUTATION from '../graphql/TeamPlayerAdd.gql'

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

export function mutateUserUpdate (apolloClient, userId, input) {
  return apolloClient.mutate({
    mutation: USER_UPDATE_MUTATION,
    variables: {
      userId,
      input,
    },
  })
}

export function mutateTeamAdd (apolloClient, input) {
  return apolloClient.mutate({
    mutation: TEAM_ADD_MUTATION,
    variables: {
      input,
    },
  })
}

export function mutateTeamPlayerAdd (apolloClient, token) {
  return apolloClient.mutate({
    mutation: TEAM_PLAYER_ADD_MUTATION,
    variables: {
      token,
    },
  })
}
