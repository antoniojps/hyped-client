<template>
  <BasePage>

    <template slot="header">
      <div class="page__title">
        <h1>Team</h1>
        <TeamCaptain/>
      </div>
    </template>

    <template slot="actions">
      <BaseButton>
        Manage team
      </BaseButton>

      <BaseButton>
        Invite player
      </BaseButton>

      <BaseButton>
        Edit team
      </BaseButton>
    </template>

    <ApolloQuery
      :query="require('@/graphql/Team.gql')"
      :variables="{ teamId }"
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
            :id="data.team._id"
            :name="data.team.name"
            :shortname="data.team.shortname"
            :logo="data.team.logo"
            :link="false"
            class="marginVertBase"
          />

          <h3>Stats</h3>
          <TeamStats :stats="stats"/>

          <div class="marginVertBase">
            <h3>Roster</h3>
            <div class="container-dark">
              <TeamRoster :roster="data.team.roster"/>
            </div>
          </div>

          <div v-if="data.team === null" class="marginVertBase">
            <BaseError large text="This team doesnt exist"/>
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
import TeamCaptain from '@/components/TeamCaptain.vue'
import TeamStats from '@/components/CardStatsList.vue'
import TeamRoster from '@/components/TeamRoster.vue'

export default {
  name: 'PageTeam',
  components: {
    TeamCard,
    TeamCaptain,
    TeamStats,
    TeamRoster,
  },
  data () {
    return {
      stats: {
        matches: 28,
        avgPlacement: 6,
        winRate: 16.42,
        top10Rate: 77.61,
        avgKills: 8,
        avgDamage: 983,
      },
    }
  },
  computed: {
    teamId () {
      return this.$route.params.id
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
  .page {
    &__title {
      display: flex;
    }
  }
</style>
