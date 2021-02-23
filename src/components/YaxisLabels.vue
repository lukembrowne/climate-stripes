<template>
  <g>
    <text :x="x" :y="y" text-anchor="left" fill="white"
      >– {{ temp }}° {{ unit }}
    </text>
  </g>
</template>

<script>
export default {
  name: "YaxisLabels",
  props: {
    barHeight: Number,
    temp: Number,
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