<template>
  <div class="modal">

    <div class="modal__header">
      <BaseIcon
        :height="logoHeight"
        class="modal__logo"
        src="logos/hyped_logo"
      />
      <div class="modal__title">
        <h4 class="active">Hyped arena</h4>
        <h1>Player Setup</h1>
      </div>
    </div>

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
        type="primary"
        class="modal__input--btn"
        @click="handleConfirm"
      >
        {{ actionBtnTxt }}
      </el-button>
    </div>

    <UserPubgLogo :text="pubgLogoText"/>

    <p class="size-sm grey spacing marginTop">In order to join the games we need to connect your  PUBG account to the Hyped Arena , please make sure you enter your name exactly like it is in the game (case sensitive)</p>

    <el-button
      class="discreet"
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
import resizeMixin from '@/mixins/resize'
import UserPubgLogo from '@/components/UserPubgLogo'
import { queryPubgPlayerName, mutateUserPubgNickAdd } from '@/utils/requests'

export default {
  name: 'ModalPubgNick',
  components: {
    UserPubgLogo,
  },
  mixins: [resizeMixin],
  data () {
    return {
      pubgNick: '',
      pubgNickSuccess: false,
      pubgNickWarn: false,
      pubgNickErr: false,
      loading: false,
      confirmedPubgNick: null,
      savedPubgNick: null,
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    logoHeight () {
      if (this.breakpointMd) return '71px'
      return 'auto'
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
        if (this.pubgNickSuccess) return `Welcome to the Hyped Arena ${this.confirmedPubgNick}!`
        if (this.pubgNickWarn && this.isValidPubgNick) return 'We couldn’t find you, typed the name correctly?'
        if (this.pubgNickWarn && !this.isValidPubgNick) return 'Invalid PUBG name, typed the name correctly?'
        if (this.pubgNickErr) return 'Something went wrong...'
      }
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
  methods: {
    openSkipModal () {
      if (!this.isSavedPubgNick) {
        this.$confirm('You won\'t be able to join games. Continue?', {
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
        })
          .then(() => this.$router.push('/'))
          .catch(ignore => {})
      } else this.$router.push('/')
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
            this.pubgNickWarn = true
            this.confirmedPubgNick = this.pubgNick
          } else {
            const pubgNick = await this.findPubgPlayer()
            if (pubgNick) await this.userPubgNickAdd()
          }
        } else {
          await this.userPubgNickAdd()
        }
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.modal {
  max-width: 260px;
  @include screen(md) {
    max-width: 350px;
  }
  &__header{
    display: flex;
    align-items: flex-end;
    margin-bottom: $spacingLSmall;
    @include screen(md){
      margin-bottom: $spacingBase;
    }
  }
  &__title {
    padding-left: $spacingAverage;
    h1, h4 {
      line-height: $sizeLarge;
    }
    @include screen(md) {
      h1, h4 {
        line-height: $sizeXLarge;
      }
    }
  }
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
