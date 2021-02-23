<template>
  <g>
    <text
      :x="x + 20"
      :y="y"
      :font-size="barHeight * 0.04"
      text-anchor="left"
      fill="white"
      >Temperature (°{{ unit }})
    </text>
  </g>
</template>

<script>
export default {
  name: "YaxisTitle",
  props: {
    barHeight: Number,
    x: Number,
    y: Number,
    fahrenSelected: Boolean,
  },

  computed: {
    unit: function () {
      if (this.fahrenSelected) {
        return "F";
      } else {
        return "C";
      }
    },
  },
};
</script>

<style>
</style>