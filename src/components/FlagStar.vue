<template>
  <svg>
    <g
      :class="{ active: active, selected: selected }"
      :id="stateData.state"
      @mouseover="mouseOver"
      @mouseleave="mouseLeave"
      @click="updateSelectedState($event)"
      fill="white"
    >
      <polygon :points="points" />
      <!-- State abbreviation -->
      <!-- Font size and positioning relative to base coordinates and starWidth -->
      <text
        :x="baseXY.baseX + starWidth / 2"
        :y="baseXY.baseY + starWidth / 1.65"
        :font-size="starWidth * 0.25"
        text-anchor="middle"
        fill="black"
        :class="{ activeStar: active, selectedStar: selected }"
      >
        {{ stateData.abbr }}
      </text>
      <b-tooltip
        :target="stateData.state"
        :title="stateData.state"
        container="flag-hover-zone"
      ></b-tooltip>
    </g>
  </svg>
</template>


<script>
export default {
  name: "FlagStar",

  props: {
    starIndex: Number,
    starWidth: Number,
    starOffsetX: Number,
    starOffsetY: Number,
    stateData: Object,
  },

  data() {
    return {
      active: false,
      selectedState: String,
    };
  },

  computed: {
    selected: function () {
      if (this.selectedState == this.stateData.state) {
        return true;
      } else {
        return false;
      }
    },

    // Calculate baseXY coordinates of the top-left corner of the star
    baseXY: function () {
      // Adjust star in Y direction to set how much overlap with star above
      // Arbitrary and adjust until it looks right
      var starYadjustOverlap = 0.85;

      // Add if else statement to calculate which row it should be on from x index - after first row of stars filled in, move to next row
      // Arrange stars on x axis using the star index and offset by half the width of the X offset, calculated in main app
      if (this.starIndex <= 5) {
        // First row
        var baseX =
          this.starIndex * this.starWidth +
          ((this.starIndex + 1) * this.starOffsetX - this.starOffsetX / 2);
        var baseY = 0 + (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 6 && this.starIndex <= 10) {
        // Row 2
        baseX =
          (this.starIndex - 6) * this.starWidth +
          ((this.starIndex - 4) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 11 && this.starIndex <= 16) {
        // Row 3
        baseX =
          (this.starIndex - 11) * this.starWidth +
          ((this.starIndex - 10) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 2 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 17 && this.starIndex <= 21) {
        // Row 4
        baseX =
          (this.starIndex - 17) * this.starWidth +
          ((this.starIndex - 15) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 3 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 22 && this.starIndex <= 27) {
        // Row 5
        baseX =
          (this.starIndex - 22) * this.starWidth +
          ((this.starIndex - 21) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 4 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 28 && this.starIndex <= 32) {
        // Row 6
        baseX =
          (this.starIndex - 28) * this.starWidth +
          ((this.starIndex - 26) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 5 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 33 && this.starIndex <= 38) {
        // Row 7
        baseX =
          (this.starIndex - 33) * this.starWidth +
          ((this.starIndex - 32) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 6 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 39 && this.starIndex <= 43) {
        // Row 8
        baseX =
          (this.starIndex - 39) * this.starWidth +
          ((this.starIndex - 37) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 7 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      } else if (this.starIndex >= 44 && this.starIndex <= 49) {
        // Row 9
        baseX =
          (this.starIndex - 44) * this.starWidth +
          ((this.starIndex - 43) * this.starOffsetX - this.starOffsetX / 2);
        baseY =
          this.starWidth * 8 * starYadjustOverlap +
          (this.starOffsetY - this.starOffsetY / 2);
      }

      return { baseX: baseX, baseY: baseY };
    },
    points: function () {
      var x1 = this.starWidth / 2 + this.baseXY.baseX;
      var y1 = this.baseXY.baseY;

      var x2 = this.starWidth * 0.18 + this.baseXY.baseX;
      var y2 = this.starWidth + this.baseXY.baseY;

      var x3 = this.starWidth + this.baseXY.baseX;
      var y3 = this.starWidth * 0.3888 + this.baseXY.baseY;

      var x4 = 0 + this.baseXY.baseX;
      var y4 = this.starWidth * 0.3888 + this.baseXY.baseY;

      var x5 = this.starWidth * 0.82 + this.baseXY.baseX;
      var y5 = this.starWidth + this.baseXY.baseY;

      var points =
        x1 +
        "," +
        y1 +
        " " +
        x2 +
        "," +
        y2 +
        " " +
        x3 +
        "," +
        y3 +
        " " +
        x4 +
        "," +
        y4 +
        " " +
        x5 +
        "," +
        y5 +
        " ";
      // console.log("Points is: " + points);
      return points;
    },
  },
  methods: {
    mouseOver: function () {
      this.active = true;
      // console.log("MouseOver " + this.stateData.abbr);
    },
    mouseLeave: function () {
      this.active = false;
      // console.log("MouseLeaving " + this.stateData.abbr);
    },
    updateSelectedState(event) {
      this.$emit("updateSelectedState", this.stateData.state);
    },
  },
};
</script>

<style scoped>
.active {
  /* opacity: 0.5; */
  fill: #cb181d;
}

.selected {
  /* opacity: 0.5; */
  fill: #cb181d;
}
.activeStar {
  /* opacity: 0.5; */
  fill: white;
}

.selectedStar {
  /* opacity: 0.5; */
  fill: white;
}
</style>

