import axios from 'axios'
import { ENDPOINT } from '@/config'

const ax = axios.create({
  baseURL: ENDPOINT,
  timeout: 1000,
  withCredentials: true,
})

export function logout () {
  return ax.get('/auth/logout')
}

// export function queryPubgPlayerName(apolloClient, name) {
//   try {
//     apolloClient.query()
//   } catch (err) {

//   }
// }
