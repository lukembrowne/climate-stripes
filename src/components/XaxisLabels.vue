<template>
  <g>
    <text
      :x="x"
      :y="y + xAxisLabelOffset - xAxisLabelOffset / 2"
      text-anchor="middle"
      fill="white"
      >|
    </text>
    <text :x="x" :y="y + xAxisLabelOffset" text-anchor="middle" fill="white">{{
      year
    }}</text>
  </g>
</template>

<script>
export default {
  name: "XaxisLabels",
  props: {
    barWidth: Number,
    barHeight: Number,
    index: Number,
    year: Number,
    x: Number,
    y: Number,
  },

  computed: {
    xAxisLabelOffset: function () {
      if (this.barHeight < 200) {
        return this.barHeight * 0.15;
      } else if (this.barHeight < 250) {
        return this.barHeight * 0.1;
      } else {
        return this.barHeight * 0.075;
      }
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 1024px) {
  text {
    font-size: 1rem;
  }
}
@media all and (max-width: 839px) {
  text {
    font-size: 0.75rem;
  }
}
@media all and (max-width: 480px) {
  text {
    font-size: 0.55rem;
  }
}
</style>