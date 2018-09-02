<template>
  <div>

    <p class="modal__info">{{ info }}</p>

    <div class="modal__input">
      <el-input
        v-model="pubgNick"
        :class="inputClassObj"
        class="modal__input--pubgNick"
        placeholder="Battlegrounds name"
        @keyup.enter.native="handleConfirm"
      >
        <i
          slot="suffix"
          :class="iconClassObj"
          class="el-input__icon"
        />
      </el-input>
      <el-button
        :loading="loading"
        :disabled="pubgNickWarn && !isValidPubgNick"
        type="primary"
        class="modal__input--btn"
        @click="handleConfirm"
      >
        {{ actionBtnTxt }}
      </el-button>
    </div>

    <UserPubgLogo :text="pubgLogoText" white/>

    <p class="size-sm grey spacing marginTop">In order to join the games we need to connect your  PUBG account to the Hyped Arena , please make sure you enter your name exactly like it is in the game (case sensitive)</p>

    <el-button
      icon="el-icon-arrow-right"
      size="mini"
      @click="openSkipModal"
    >
      Skip
    </el-button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserPubgLogo from '@/components/UserPubgLogo'
import { queryPubgPlayerName, mutateUserPubgNickAdd } from '@/utils/requests'

export default {
  name: 'UserPubgNickModal',
  components: {
    UserPubgLogo,
  },
  data () {
    return {
      pubgNick: '',
      pubgNickSuccess: false,
      pubgNickWarn: false,
      pubgNickErr: false,
      loading: false,
      confirmedPubgNick: null,
      savedPubgNick: null,
      editingPubgNick: false,
      userPubgNick: null,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    redirect () {
      if (this.editingPubgNick) return '/profile'
      return '/'
    },
    pubgNickLength () {
      return this.pubgNick.split('').length
    },
    pubgLogoText () {
      if (this.pubgNickLength > 4) {
        return this.pubgNick
      }
      return 'Pubg name'
    },
    isValidPubgNick () {
      // eslint-disable-next-line
      const regexPubgNick = RegExp('^[a-zA-Z0-9\_-]{4,16}$')
      return regexPubgNick.test(this.pubgNick)
    },
    isConfirmedPubgNick () {
      return this.confirmedPubgNick === this.pubgNick
    },
    isSavedPubgNick () {
      return this.pubgNick === this.savedPubgNick
    },
    actionBtnTxt () {
      if (!this.isSavedPubgNick) {
        return 'Confirm'
      }
      return 'Next'
    },
    info () {
      if (this.isConfirmedPubgNick) {
        if (this.pubgNickSuccess && this.editingPubgNick) return `Updated your PUBG Player name to ${this.confirmedPubgNick}!`
        if (this.pubgNickSuccess) return `Welcome to the Hyped Arena ${this.confirmedPubgNick}!`
        if (this.pubgNickWarn && this.isValidPubgNick) return 'We couldn’t find you, typed the name correctly?'
        if (this.pubgNickWarn && !this.isValidPubgNick) return 'Invalid PUBG name, typed the name correctly?'
        if (this.pubgNickErr) return 'Something went wrong...'
        if (!this.pubgNickSuccess && this.editingPubgNick) return `Your current PUBG player name is ${this.userPubgNick}!`
      } else if (this.editingPubgNick) return `Your current PUBG player name is ${this.userPubgNick}!`
      return 'Fill up your PUBG name to start playing!'
    },
    inputClassObj () {
      return {
        'el-input--warning': (this.pubgNickWarn || this.pubgNickErr) && this.isConfirmedPubgNick,
        'el-input--success': this.pubgNickSuccess && this.isSavedPubgNick,
      }
    },
    iconClassObj () {
      return {
        'el-icon-error': this.pubgNickErr && this.isConfirmedPubgNick,
        'el-icon-warning': this.pubgNickWarn && this.isConfirmedPubgNick,
        'el-icon-success': this.pubgNickSuccess && this.isSavedPubgNick,
      }
    },
  },
  mounted () {
    if (this.user) {
      const { pubgNick } = this.user
      if (pubgNick) {
        this.pubgNick = pubgNick
        this.confirmedPubgNick = pubgNick
        this.userPubgNick = pubgNick
        this.editingPubgNick = true
      }
    }
  },
  methods: {
    openSkipModal () {
      if (!this.isSavedPubgNick && !this.user.pubgNick) {
        this.$confirm('You won\'t be able to join games. Continue?', {
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
        })
          .then(() => this.$router.push(this.redirect))
          .catch(ignore => {})
      } else this.$router.push(this.redirect)
    },
    async findPubgPlayer () {
      this.loading = true
      try {
        const { data: { pubgPlayer: { name } } } = await queryPubgPlayerName(this.$apollo, this.pubgNick)
        this.confirmedPubgNick = name
        this.pubgNickSuccess = false
        this.pubgNickWarn = false
        this.pubgNickErr = false
        return name
      } catch (err) {
        console.log(err.message)
        this.confirmedPubgNick = this.pubgNick
        this.pubgNickSuccess = false
        this.pubgNickWarn = true
        this.pubgNickErr = false
        this.loading = false
      }
    },
    async userPubgNickAdd () {
      this.loading = true
      try {
        const { data: { userPubgNickAdd: { pubgNick } } } = await mutateUserPubgNickAdd(this.$apollo, this.user._id, this.pubgNick)
        this.savedPubgNick = pubgNick
        this.pubgNickWarn = false
        this.pubgNickSuccess = true
        this.userPubgNick = pubgNick
        this.loading = false
      } catch (err) {
        this.confirmedPubgNick = this.pubgNick
        this.pubgNickSuccess = false
        this.pubgNickWarn = false
        this.pubgNickErr = true
        this.loading = false
      }
    },
    async handleConfirm () {
      if (!this.isSavedPubgNick) {
        if (!this.isConfirmedPubgNick) {
          if (!this.isValidPubgNick) {
            this.pubgNickSuccess = false
            this.pubgNickWarn = true
            this.pubgNickErr = false
            this.confirmedPubgNick = this.pubgNick
          } else {
            const pubgNick = await this.findPubgPlayer()
            if (pubgNick) await this.userPubgNickAdd()
          }
        } else if (!this.isValidPubgNick) {
          this.pubgNickWarn = true
        } else {
          await this.userPubgNickAdd()
        }
      } else {
        this.$router.push(this.redirect)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.modal {
  &__info {
    padding-bottom: $spacingSmall;
  }
  &__input {
    width: 100%;
    display:inline-grid;
    grid-template-columns: 100%;
    grid-template-areas: "input" "button";
    &--pubgNick {
      grid-area: input;
      margin-bottom: $spacingLSmall;
    }
    &--btn {
      grid-area: button;
      margin-bottom: $spacingBase;
    }
    @include screen(md) {
      grid-template-columns: 2fr $spacingLSmall 1fr;
      grid-template-areas: "input . button";
    }
  }
}
</style>
