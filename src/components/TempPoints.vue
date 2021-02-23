<template>
  <g>
    <circle
      :id="'point' + barData.year"
      :cx="cx"
      :cy="cy"
      :r="radius"
      fill="black"
    />
    <b-tooltip
      :target="'point' + barData.year"
      :title="
        barData.year + ' = ' + Math.round(barData.temp * 10) / 10 + '° ' + unit
      "
      container="flag-hover-zone"
    ></b-tooltip>
  </g>
</template>

<script>
export default {
  name: "TempPoints",
  props: {
    barWidth: Number,
    barHeight: Number,
    index: Number,
    fill: String,
    barData: Object,
    cx: Number,
    cy: Number,
    fahrenSelected: Boolean,
  },
  data() {
    return {
      hover: false,
    };
  },

  computed: {
    unit: function () {
      if (this.fahrenSelected) {
        return "F";
      } else {
        return "C";
      }
    },
    radius: function () {
      return (this.barWidth / 2) * 0.75; // Scale size of points based on barWidth
    },
  },
};
</script>

<style>
</style>