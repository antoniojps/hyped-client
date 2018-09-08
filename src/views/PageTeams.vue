<template>
  <BaseAuth redirect="/login">
    <BasePage>

      <template slot="header">
        <h1>My teams</h1>
      </template>

      <template slot="actions">
        <router-link
          tag="div"
          to="/teams/create"
        >
          <BaseButton>
            Create Team
          </BaseButton>
        </router-link>

        <BaseButton
          :active="showJoin"
          @click.native="showJoin = !showJoin"
        >
          Join Team
        </BaseButton>
      </template>

      <ApolloQuery
        :query="require('@/graphql/UserTeams.gql')"
        fetch-policy="cache-and-network"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading">
            <BaseLineLoading/>
          </div>

          <!-- Error -->
          <div v-else-if="error">
            <BaseError large/>
          </div>

          <!-- Result -->
          <div v-else-if="data">
            <el-collapse-transition>
              <TeamJoin
                v-if="showJoin"
                class="marginTop"
                @update:teams="updateJoinedTeams"
              />
            </el-collapse-transition>

            <TeamCard
              v-for="team of data.currentUser.teams"
              :key="team.name"
              :id="team._id"
              :name="team.name"
              :shortname="team.shortname"
              :logo="team.logo"
              :roster="team.roster"
              class="marginVertBase pointer"
            />
            <div v-if="data.currentUser.teams.length === 0 && joinedTeamsList.length === 0" class="marginVertBase">
              <BaseError large text="You don't have any teams yet"/>
            </div>
          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">
            <BaseError large text="No result"/>
          </div>

        </template>
      </ApolloQuery>

      <TeamCard
        v-for="team of joinedTeamsList"
        :key="team.name"
        :id="team._id"
        :name="team.name"
        :shortname="team.shortname"
        :logo="team.logo"
        :roster="team.roster"
        class="marginVertBase pointer"
      />

    </BasePage>
  </BaseAuth>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue'
import TeamJoin from '@/components/TeamJoin.vue'

export default {
  name: 'MyTeams',
  components: {
    TeamCard,
    TeamJoin,
  },
  data () {
    return {
      joinedTeamsList: [],
      showJoin: false,
    }
  },
  methods: {
    updateJoinedTeams (team) {
      this.showJoin = false
      this.joinedTeamsList.push(team)
    },
  },
}
</script>
