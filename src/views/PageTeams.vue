<template>
  <BasePage>

    <template slot="header">
      <h1>My teams</h1>
    </template>

    <div class="page-actions">
      <router-link
        tag="div"
        class="marginRight"
        to="/createteam"
      >
        <BaseButton>
          Create Team
        </BaseButton>
      </router-link>

      <BaseButton>
        Join Team
      </BaseButton>
    </div>

    <ApolloQuery
      :query="require('@/graphql/UserTeams.gql')"
      fetch-policy="cache-and-network"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading">
          <BaseLoading/>
        </div>

        <!-- Error -->
        <div v-else-if="error">
          <BaseError large/>
        </div>

        <!-- Result -->
        <div v-else-if="data">
          <TeamCard
            v-for="team of data.currentUser.teams"
            :key="team.name"
            :id="team._id"
            :name="team.name"
            :shortname="team.shortname"
            :logo="team.logo"
            :roster="team.roster"
            class="marginVertBase"
          />
          <div v-if="data.currentUser.teams.length === 0" class="marginVertBase">
            <BaseError large text="You don't have any teams yet"/>
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">
          <BaseError large text="No result"/>
        </div>

      </template>
    </ApolloQuery>

  </BasePage>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue'

export default {
  name: 'MyTeams',
  components: {
    TeamCard,
  },
}
</script>

<style lang="scss" scoped>
  .page {
    &-actions {
      display:flex;
    }
  }
</style>
