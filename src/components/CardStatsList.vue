<template>
  <div class="card-list">
    <CardStat
      v-for="stat in statsArr"
      :key="stat.description"
      :stat="stat"
    />
  </div>
</template>

<script>
import CardStat from '@/components/CardStat.vue'

export default {
  name: 'CardStatsList',
  components: {
    CardStat,
  },
  props: {
    stats: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data () {
    return {
      statsDescriptions: {
        matches: 'Matches',
        avgPlacement: 'Avg. Placement',
        winRate: 'Win Rate %',
        top10Rate: 'Top 10 %',
        avgKills: 'Avg. Kills',
        avgDamage: 'Avg. Damage',
      },
      statsArr: null,
    }
  },
  created () {
    this.generateStatsArr()
  },
  methods: {
    generateStatsArr () {
      const statsArr = Object.keys(this.stats).map(key => ({
        description: this.statsDescriptions[key],
        value: this.generateStatValue(this.stats[key]),
      }))
      this.statsArr = statsArr
    },
    generateStatValue (value) {
      if (!value) return '-'
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-column-gap: $spacingBase;
  grid-row-gap: $spacingBase;
  @include screen(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
