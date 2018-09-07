<template>
  <BasePage>
    <template slot="header">
      <div class="page__title">
        <h1>Team</h1>
        <TeamAuthCaptain
          v-if="team && user"
          :roster="team.roster"
          :user-id="user._id"
        >
          <TeamCaptain/>
        </TeamAuthCaptain>
      </div>
    </template>

    <template
      v-if="user"
      slot="actions"
    >
      <TeamAuthCaptain
        v-if="team"
        :roster="team.roster"
        :user-id="user._id"
      >
        <BaseButton>
          Manage team
        </BaseButton>

        <BaseButton>
          Invite player
        </BaseButton>

        <BaseButton>
          Edit team
        </BaseButton>
      </TeamAuthCaptain>
    </template>

    <!-- Loading -->
    <div v-if="loading">
      <BaseLoading/>
    </div>

    <!-- Result -->
    <div v-else-if="team">

      <TeamCard
        :id="team._id"
        :name="team.name"
        :shortname="team.shortname"
        :logo="team.logo"
        :link="false"
        class="marginBottom"
      />

      <h3>Stats</h3>
      <TeamStats :stats="stats" class="marginBottom"/>

      <div class="marginBottom">
        <h3>Roster</h3>
        <div class="container-dark">
          <TeamRoster :roster="team.roster"/>
        </div>
      </div>

      <div v-if="team === null" class="marginBottom">
        <BaseError large text="This team doesnt exist"/>
      </div>
    </div>

    <!-- No result -->
    <div v-else class="no-result apollo">
      <BaseError large text="No result"/>
    </div>

  </BasePage>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue'
import TeamCaptain from '@/components/TeamCaptain.vue'
import TeamStats from '@/components/CardStatsList.vue'
import TeamRoster from '@/components/TeamRoster.vue'
import TeamAuthCaptain from '@/components/TeamAuthCaptain.vue'
import { mapGetters } from 'vuex'
import TEAM_QUERY from '@/graphql/Team.gql'

export default {
  name: 'PageTeam',
  components: {
    TeamCard,
    TeamCaptain,
    TeamStats,
    TeamRoster,
    TeamAuthCaptain,
  },
  data () {
    return {
      team: null,
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
    ...mapGetters('user', ['user']),
    teamId () {
      return this.$route.params.id
    },
    loading () {
      return this.$apollo.loading
    },
  },
  apollo: {
    team () {
      return {
        query: TEAM_QUERY,
        variables: {
          teamId: this.teamId,
        },
        fetchPolicy: 'cache-and-network',
      }
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
