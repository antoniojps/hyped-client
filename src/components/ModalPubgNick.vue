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
        Confirm
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
import resizeMixin from '@/mixins/resize'
import UserPubgLogo from '@/components/UserPubgLogo'
import PUBG_PLAYER_QUERY from '../graphql/PubgPlayerName.gql'

export default {
  name: 'ModalPubgNick',
  components: {
    UserPubgLogo,
  },
  mixins: [resizeMixin],
  data () {
    return {
      pubgNick: '',
      pubgNickErr: false,
      pubgNickSuccess: false,
      loading: false,
      confirmedPubgNick: '',
    }
  },
  computed: {
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
    isConfirmedPubgNick () {
      return this.confirmedPubgNick === this.pubgNick
    },
    info () {
      if (this.isConfirmedPubgNick) {
        if (this.pubgNickErr) return 'We couldn’t find you, typed the name correctly?'
        if (this.pubgNickSuccess) return `Welcome to the Hyped Arena ${this.pubgNick}!`
      }
      return 'Fill up your PUBG name to start playing!'
    },
    inputClassObj () {
      return {
        'el-input--warning': this.pubgNickErr && this.isConfirmedPubgNick,
        'el-input--success': this.pubgNickSuccess && this.isConfirmedPubgNick,
      }
    },
    iconClassObj () {
      return {
        'el-icon-warning': this.pubgNickErr && this.isConfirmedPubgNick,
        'el-icon-success': this.pubgNickSuccess && this.isConfirmedPubgNick,
      }
    },
  },
  methods: {
    openSkipModal () {
      this.$confirm('You won\'t be able to join games. Continue?', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
      })
        .then(() => this.$router.push('/'))
        .catch(ignore => {})
    },
    async pubgPlayer () {
      this.loading = true
      try {
        const { data: { pubgPlayer: { name } } } = await this.$apollo.query({
          query: PUBG_PLAYER_QUERY,
          variables: { name: this.pubgNick },
        })
        // pubgNickAdd Mutation here
        this.confirmedPubgNick = name
        this.pubgNickErr = false
        this.pubgNickSuccess = true
        this.loading = false
      } catch (err) {
        this.confirmedPubgNick = this.pubgNick
        this.pubgNickSuccess = false
        this.pubgNickErr = true
        this.loading = false
      }
    },
    async handleConfirm () {
      if (!this.isConfirmedPubgNick) {
        await this.pubgPlayer()
      } else {
        console.log('Save to DB and redirect ', this.pubgNick)
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
