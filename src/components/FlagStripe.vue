<template>
  <rect :x="x" :y="0" :fill="fill" :width="barWidth" :height="barHeight">
  </rect>
</template>


<script>
export default {
  name: "FlagStripe",
  props: {
    barWidth: Number,
    barHeight: Number,
    index: Number,
    fill: String,
    barData: Object,
    x: Number,
  },
  data() {
    return {
      hover: false,
    };
  },

  // methods: {
  //   mouseOver: function (index) {
  //     this.hover = !this.hover;
  //     this.$store.commit("updateYear", this.barData.year);
  //     this.$store.commit("updateFill", this.barData.fill);
  //     this.$store.commit("updateAnom", this.barData.temp);
  //   },
  //   mouseLeave: function (index) {
  //     this.hover = !this.hover;
  //   },
  // },
};
</script>

<style scoped>
/* .hover {
  stroke-width: 1;
  stroke: black;
  fill: green;
} */
</style>