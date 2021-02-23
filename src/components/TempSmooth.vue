<template>
  <polyline
    :points="points"
    stroke="black"
    fill="none"
    :stroke-width="strokeWidth"
  />
</template>

<script>
export default {
  name: "TempSmooth",
  props: {
    xArray: Array,
    yArray: Array,
    barHeight: Number,
  },
  data() {
    return {
      hover: false,
    };
  },

  computed: {
    points: function (x) {
      var points = "";

      for (var i = 0; i < this.xArray.length; i++) {
        points = points + this.xArray[i] + "," + this.yArray[i] + " ";
      }

      return points;
    },

    strokeWidth: function () {
      return this.barHeight * 0.005; // Scale size of smoothed line based on size
    },
  },
};
</script>

<style>
</style>