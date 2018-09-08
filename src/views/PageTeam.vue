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
        class="marginBottom"
      >
        <BaseButton
          :active="showInvite"
          @click.native="showInvite = !showInvite"
        >
          Invite player
        </BaseButton>
      </TeamAuthCaptain>
    </template>

    <transition name="el-fade-in">

      <!-- Loading -->
      <div v-if="loading">
        <BaseLineLoading/>
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

        <el-collapse-transition>
          <div v-if="showInvite">
            <h3>Invite player</h3>
            <p>The invite code is valid for 24 hours and can be redeemed at the
              <router-link to="/teams">
                My Teams
              </router-link>
              page by clicking in Join Team.
            </p>
            <TeamInvite :team-id="team._id" class="marginBottom"/>
          </div>
        </el-collapse-transition>

        <span>
          <h3>Stats</h3>
          <TeamStats :stats="stats" class="marginBottom"/>
        </span>

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
    </transition>

  </BasePage>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue'
import TeamCaptain from '@/components/TeamCaptain.vue'
import TeamStats from '@/components/CardStatsList.vue'
import TeamRoster from '@/components/TeamRoster.vue'
import TeamAuthCaptain from '@/components/TeamAuthCaptain.vue'
import TeamInvite from '@/components/TeamInvite.vue'
import { mapGetters } from 'vuex'
import TEAM_BY_NAME_QUERY from '@/graphql/TeamByName.gql'

export default {
  name: 'PageTeam',
  components: {
    TeamCard,
    TeamCaptain,
    TeamStats,
    TeamRoster,
    TeamAuthCaptain,
    TeamInvite,
  },
  data () {
    return {
      teamByName: null,
      stats: {
        matches: null,
        avgPlacement: null,
        winRate: null,
        top10Rate: null,
        avgKills: null,
        avgDamage: null,
      },
      showInvite: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    name () {
      // replace hyphen with spaces
      const nameParam = this.$route.params.name
      return nameParam.replace(/-/g, ' ')
    },
    loading () {
      return this.$apollo.loading
    },
    team () {
      return this.teamByName
    },
  },
  apollo: {
    teamByName () {
      return {
        query: TEAM_BY_NAME_QUERY,
        variables: {
          name: this.name,
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
