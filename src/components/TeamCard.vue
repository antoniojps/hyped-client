<template>
  <div class="team">
    <div
      class="team__wrapper"
      @click.stop="handleClickTeam"
    >
      <div class="team__lft">
        <div class="team__logo">
          <TeamLogo :shortname="shortname" :logo="logo"/>
        </div>
        <div class="team__name">
          <h4>{{ name }}</h4>
        </div>
        <div class="team__shortname flex">
          <TeamShortname :shortname="shortname"/>
          <TeamAuthCaptain
            v-if="user"
            :roster="roster"
            :user-id="user._id"
          >
            <TeamCaptain logo-only title="Captain"/>
          </TeamAuthCaptain>
        </div>
      </div>
      <div class="team__rgt">
        <div v-if="id && link" class="team__actions">
          <router-link
            :to="teamRoute"
            tag="div"
          >
            <el-button
              icon="el-icon-arrow-right"
              size="mini"
            />
          </router-link>
        </div>
      </div>
    </div>

    <el-collapse-transition>
      <div v-if="showRoster" class="team__roster">
        <TeamRoster :roster="roster"/>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import TeamShortname from '@/components/TeamShortname.vue'
import TeamLogo from '@/components/TeamLogo.vue'
import TeamRoster from '@/components/TeamRoster.vue'
import TeamCaptain from '@/components/TeamCaptain.vue'
import TeamAuthCaptain from '@/components/TeamAuthCaptain.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'TeamCard',
  components: {
    TeamShortname,
    TeamLogo,
    TeamRoster,
    TeamCaptain,
    TeamAuthCaptain,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    shortname: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: null,
    },
    roster: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    link: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {
      showRoster: false,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    nameToHyphenAndLowerCase () {
      const newName = this.name.replace(/\s+/g, '-').toLowerCase()
      return newName
    },
    teamRoute () {
      return `/team/${this.nameToHyphenAndLowerCase}`
    },
  },
  methods: {
    handleClickTeam () {
      // eslint-disable-next-line
      if (!this.roster || this.roster.length === 0) return;
      this.showRoster = !this.showRoster
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';

.team {
  border-radius: $sizeXSmall;
  background-color: $colorBgDark;
  &__wrapper {
    display:flex;
    justify-content: space-between;
    padding: $spacingLSmall $spacingMSBase;
  }
  &__lft {
    display:flex;
    align-items:center;
  }
  &__rgt {
    display: none;
    @include screen(md){
      display:flex;
      align-items:center;
    }
  }
  &__name {
    padding-right: $spacingLSmall;
  }
  &__logo {
    height: 60px;
    min-width: 60px;
    display:flex;
    align-items: center;
    margin-right: $spacingLSmall;
  }
  &__roster {
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    background-color: $colorBase4;
    color: $colorBase;
  }
}
</style>
