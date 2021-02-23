<template>
  <text
    :x="x"
    :y="y + xAxisTitleOffset"
    :font-size="barHeight * 0.04"
    text-anchor="middle"
    fill="white"
    >Year
  </text>
</template>

<script>
export default {
  name: "XaxisTitle",
  props: {
    x: Number,
    y: Number,
    barHeight: Number,
  },

  computed: {
    xAxisTitleOffset: function () {
      if (this.barHeight < 200) {
        return this.barHeight * 0.25;
      } else if (this.barHeight < 250) {
        return this.barHeight * 0.2;
      } else {
        return this.barHeight * 0.15;
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