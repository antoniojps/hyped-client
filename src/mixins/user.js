import CURRENT_USER_QUERY from './../graphql/CurrentUser.gql'
import { mapMutations, mapGetters } from 'vuex'

const userMixin = {
  async created () {
    this.currentUser()
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    ...mapMutations('user', ['UPDATE_USER']),
    async currentUser () {
      try {
        const { data: { currentUser } } = await this.$apollo.query({ query: CURRENT_USER_QUERY, fetchPolicy: 'no-cache' })
        this.UPDATE_USER(currentUser)
      } catch (err) {
        this.UPDATE_USER(null)
      }
    },
  },
}

export default userMixin
