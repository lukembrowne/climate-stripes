
<template>
  <div id="app">
    <div id="flex-column">
      <div id="title-box" class="flex-box" :style="[titleStyle]">
        <h5 id="title">
          Stars and <br />
          Climate Stripes
        </h5>
      </div>
      <div id="description-box" class="flex-box" :style="[titleStyle]">
        <p id="description">
          <a
            href="https://en.wikipedia.org/wiki/Warming_stripes"
            target="_blank"
            >Climate stripes</a
          >
          visualize how temperatures have changed over the past century. Each
          vertical stripe represents the average temperature in a year, with
          cooler temperatures shown in blue and warmer temperatures in red.
        </p>
      </div>

      <hr :style="[titleStyle]" />

      <div id="flag-title">
        <h5>{{ selectedState }}</h5>
      </div>

      <!-- Set a div with the same height and width of flag to keep track of mouse entering and exiting -->
      <div
        id="flag-hover-zone"
        @mouseenter="mouseEnterFlag"
        @mouseleave="mouseLeaveFlag"
        :style="[hoverZoneStyle]"
      >
        <!-- Overall Flag SVG -->
        <svg id="svg-flag" :width="flagWidth" :height="flagHeight">
          <!-- Loop over 7 states -->
          <svg id="svg-flag-body">
            <FlagStripe
              v-for="(item, index) in climateData"
              :key="index"
              :index="index"
              :barWidth="barWidth"
              :barHeight="barHeight"
              :fill="item.fill"
              :barData="item"
              :x="xScale(item.year)"
            ></FlagStripe>
          </svg>

          <!-- Points and loess smooth line -->
          <transition name="fade">
            <svg v-show="showPoints">
              <TempPoints
                v-for="(item, index) in climateData"
                :key="item.year"
                :index="index"
                :barWidth="barWidth"
                :barHeight="barHeight"
                :fill="item.fill"
                :barData="item"
                :cx="xScale(item.year) + barWidth / 2"
                :cy="yScale(item.temp)"
                :fahrenSelected="fahrenSelected"
              />
            </svg>
          </transition>

          <transition name="fade">
            <svg v-show="showPoints">
              <TempSmooth
                :climateDataSmooth="climateDataSmooth"
                :yArray="
                  climateDataSmooth.map(function (x) {
                    return yScale(x.temp);
                  })
                "
                :xArray="
                  climateDataSmooth.map(function (x) {
                    return xScale(x.year);
                  })
                "
                :barHeight="barHeight"
              />
            </svg>
          </transition>

          <!-- Blue Rectangle / Canton -->
          <svg>
            <rect
              x="0"
              y="0"
              fill="#3C3B6E"
              :width="flagWidth * 0.4"
              :height="flagHeight * 0.5385"
            ></rect>
          </svg>

          <!-- 50 stars -->
          <svg>
            <FlagStar
              v-for="(item, starIndex) in stateList"
              :key="starIndex"
              :starIndex="starIndex"
              :starWidth="starWidth"
              :starOffsetX="starOffsetX"
              :starOffsetY="starOffsetY"
              :stateData="item"
              v-on:updateSelectedState="updateSelectedState(...arguments)"
              :selectedState="selectedState"
            ></FlagStar>
          </svg>

          <transition name="fade">
            <svg>
              <XaxisLabels
                v-for="(item, index) in xAxisLabels"
                :key="index"
                :index="index"
                :barWidth="barWidth"
                :barHeight="barHeight"
                :year="item"
                :x="xScale(item) + barWidth / 2"
                :y="barHeight"
              />
            </svg>
          </transition>

          <transition name="fade">
            <svg v-show="showPoints">
              <XaxisTitle
                :x="flagWidth / 2"
                :y="barHeight"
                :barHeight="barHeight"
              />
            </svg>
          </transition>

          <transition name="fade">
            <svg v-show="showPoints">
              <YaxisLabels
                v-for="(item, index) in yAxisLabels"
                :key="index"
                :index="index"
                :flagWidth="flagWidth"
                :barHeight="barHeight"
                :temp="item"
                :maxTemp="maxTemp"
                :minTemp="minTemp"
                :x="flagWidth"
                :y="yScale(item)"
                :fahrenSelected="fahrenSelected"
              />
            </svg>
          </transition>
        </svg>
      </div>

      <div id="options-box" class="flex-box" :style="[titleStyle]">
        <!-- Selecting state -->
        <div id="state-selector">
          <span id="choose-state-text">Choose a state:</span>
          <v-select
            id="select-box"
            v-model="selectedState"
            :options="stateList"
            @input="updateSelectedState"
            :reduce="(state) => state.state"
            label="state"
          >
          </v-select>
        </div>

        <!-- Temperature Toggle -->
        <div id="temp-toggle">
          <span class="temp-toggle-span">
            <input
              type="radio"
              id="F"
              :value="true"
              v-model="fahrenSelected"
              @change="toggleTemp()"
            />
            <label for="F">F°</label>
          </span>
          <span class="temp-toggle-span">
            <input
              type="radio"
              id="C"
              :value="false"
              v-model="fahrenSelected"
              @change="toggleTemp()"
            />
            <label for="C"> C°</label>
          </span>
        </div>

        <!-- Show data or not -->
        <div id="show-data-checkbox">
          <input type="checkbox" v-model="showPoints" />
          <label for="checkbox">Show data</label>
        </div>
      </div>

      <hr :style="[titleStyle]" />

      <!-- Footer -->
      <Footer id="footer" :flagWidth="flagWidth" :barHeight="barHeight" />
    </div>
  </div>
</template>

<script>
import FlagStripe from "./components/FlagStripe";
import FlagStar from "./components/FlagStar";
import TempPoints from "./components/TempPoints";
import TempSmooth from "./components/TempSmooth";

import XaxisLabels from "./components/XaxisLabels";
import XaxisTitle from "./components/XaxisTitle";
import YaxisLabels from "./components/YaxisLabels";
import Footer from "./components/Footer";

import * as d3 from "d3-scale";

import countryList from "./country_list.json";
import stateList from "./state_list";
import climateDB from "./climate_data.json";
import climateDBSmooth from "./climate_data_smooth.json";

export default {
  name: "App",
  components: {
    FlagStripe,
    FlagStar,
    Footer,
    TempPoints,
    TempSmooth,
    XaxisLabels,
    YaxisLabels,
    XaxisTitle,
  },

  data() {
    return {
      climateData: [],
      climateDB: climateDB,
      climateDataSmooth: [],
      climateDBSmooth: climateDBSmooth,
      flagHover: false,
      showPoints: false,
      fahrenSelected: true,
      flagWidth: 0,
      flagHeight: 0,
      windowWidth: 0,
      windowHeight: 0,
      barWidth: 0,
      barHeight: 0,
      starWidth: 0,
      starOffsetY: 0,
      starOffsetX: 0,
      countryList: countryList,
      stateList: stateList,
      selectedState: "United States",
      minTemp: 0,
      maxTemp: 0,
      minYear: 0,
      maxYear: 0,
      xAxisLabels: [],
      yAxisLabels: [],
    };
  },

  created() {
    window.addEventListener(
      "touchmove",
      function (event) {
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      false
    );
    window.addEventListener("resize", this.recalculateUponResize);
  },

  destroyed() {
    window.removeEventListener("resize", this.recalculateUponResize);
  },

  mounted() {
    // Calculate flag size
    this.calcFlagSize();

    // Load climate data - default on just united states
    this.loadClimateData("united-states");

    // Calculate star size
    this.calcStarSize();
  },

  methods: {
    calcFlagSize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;

      // If potential flag size gets bigger than window size, then need to recalculate

      // Set minimum flag size
      if (window.innerWidth < 480) {
        var xMargin = 75; // add a bit of a margin so that y axis labels don't get cut off
        this.flagWidth = window.innerWidth - xMargin;
        this.flagHeight = this.flagWidth / 1.9;
      } else if (window.innerWidth < 839) {
        xMargin = 100; // add a bit of a margin so that y axis labels don't get cut off
        this.flagWidth = window.innerWidth - xMargin;
        this.flagHeight = this.flagWidth / 1.9;
      } else if (window.innerWidth < 1024) {
        xMargin = 125; // add a bit of a margin so that y axis labels don't get cut off
        this.flagWidth = window.innerWidth - xMargin;
        this.flagHeight = this.flagWidth / 1.9;
      } else if (window.innerWidth >= 1024) {
        xMargin = 150; // add a bit of a margin so that y axis labels don't get cut off
        this.flagWidth = 1024 - xMargin;
        this.flagHeight = this.flagWidth / 1.9;
      }
    },

    calcMinMaxTemp() {
      // Calculate min and max temps for scaling temperature overlay
      this.maxTemp = Math.max.apply(
        Math,
        this.climateData.map(function (x) {
          return x.temp;
        })
      );
      this.minTemp = Math.min.apply(
        Math,
        this.climateData.map(function (x) {
          return x.temp;
        })
      );
    },

    calcMinMaxYear() {
      // Calculate min and max years for scaling x axis
      this.maxYear = Math.max.apply(
        Math,
        this.climateData.map(function (x) {
          return x.year;
        })
      );
      this.minYear = Math.min.apply(
        Math,
        this.climateData.map(function (x) {
          return x.year;
        })
      );
    },

    calcStarSize() {
      this.starWidth = this.flagHeight * 0.0616;
      this.starOffsetY = this.flagHeight * 0.5385 * (1 / 10);
      this.starOffsetX = this.flagWidth * 0.4 * (1 / 12);
    },

    calcStripeSize() {
      // Calculate stripe size
      this.barWidth = this.flagWidth / this.climateData.length;
      this.barHeight = this.flagHeight; // Probably not necessary to calculate this every time new climate data is loaded..
    },

    createAxisLabels() {
      // Setting up x axis labels - Calculate which years to label - every 10 years by calculating where remainder = 0
      this.xAxisLabels = this.climateData
        .filter(function (x) {
          return x.year % 10 == 0;
        })
        .map(function (x) {
          return x.year;
        });

      // Setting up y axis labels
      var nYticks = 30;
      var tickSpacing = this.fahrenSelected ? 1 : 0.5; // 1 degree spacing for F, 0.5 for C
      this.yAxisLabels = [];

      for (var i = 0; i < nYticks; i++) {
        var temp =
          Math.round(
            (Math.floor(this.minTemp * 0.975) + i * tickSpacing) * 10
          ) / 10;
        if ((temp < this.maxTemp * 1.025) & (temp > this.minTemp * 0.975)) {
          this.yAxisLabels.push(temp);
        }
      }
    },

    // Convert temp from F to C or vice versa
    convertTemp(convertTo) {
      var climateDataTemp = this.climateData;

      if (convertTo == "F") {
        for (var i = 0; i < climateDataTemp.length; i++) {
          climateDataTemp[i].temp = this.climateData[i].temp * (9 / 5) + 32;
        }
      } else {
        for (i = 0; i < climateDataTemp.length; i++) {
          climateDataTemp[i].temp = (this.climateData[i].temp - 32) * (5 / 9);
        }
      }

      var climateDataTempSmooth = this.climateDataSmooth;

      if (convertTo == "F") {
        for (i = 0; i < climateDataTempSmooth.length; i++) {
          climateDataTempSmooth[i].temp =
            this.climateDataSmooth[i].temp * (9 / 5) + 32;
        }
      } else {
        for (i = 0; i < climateDataTempSmooth.length; i++) {
          climateDataTempSmooth[i].temp =
            (this.climateDataSmooth[i].temp - 32) * (5 / 9);
        }
      }
    },

    recalculateUponResize(e) {
      // Calculate flag size
      this.calcFlagSize();

      // Calculate stripe size
      this.barWidth = this.flagWidth / this.climateData.length;
      this.barHeight = this.flagHeight;

      // Calculate star size
      this.calcStarSize();
    },

    loadClimateData(formattedName) {
      // Load in climate data
      this.climateData = this.climateDB[formattedName];

      // Load in smooth climate data
      this.climateDataSmooth = this.climateDBSmooth[formattedName];

      // If to display in fahrenheight, convert to C
      if (this.fahrenSelected == false) {
        this.convertTemp("C");
      }

      // Calculat stripe size
      this.calcStripeSize();

      // Calculate min and max Temp
      this.calcMinMaxTemp();

      // Calculate min and max years for scaling x axis
      this.calcMinMaxYear();

      this.createAxisLabels();
    },

    mouseEnterFlag: function () {
      this.flagHover = true;
    },

    mouseLeaveFlag: function () {
      this.flagHover = false;
    },

    // Toggle data and display between C and F
    toggleTemp() {
      if (this.fahrenSelected == true) {
        this.convertTemp("F");
      } else if (this.fahrenSelected == false) {
        this.convertTemp("C");
      }
      this.calcMinMaxTemp();
      this.createAxisLabels();
    },

    updateSelectedState(name) {
      this.selectedState = name;

      // If no state chosen, use US as default
      if (!name) {
        this.selectedState = "United States";
        this.loadClimateData("united-states");
      } else {
        // Reformat name to load data
        const formattedName = name.toLowerCase().replace(/\s/g, "-");
        // console.log("Selecting:" + formattedName);

        // Load climate data
        this.loadClimateData(formattedName);
      }
    },

    // Takes in year and converts to pixel coordinates on flag
    xScale: function (year) {
      // Testing
      var xScale = d3
        .scaleLinear()
        .domain([this.minYear, this.maxYear + 1]) // Need to change this to MaxYear
        .range([0, this.flagWidth]);

      return xScale(year);
    },

    // Takes in temperature and converts to pixel coordinates on flag
    yScale: function (temp) {
      // Testing
      var yScale = d3
        .scaleLinear()
        .domain([this.minTemp * 0.975, this.maxTemp * 1.025])
        .range([0, this.flagHeight]);

      return this.flagHeight - yScale(temp);
    },
  },

  computed: {
    hoverZoneStyle: function () {
      return {
        width: this.flagWidth + "px",
        height: this.flagHeight + "px",
        // margin: "auto",
      };
    },

    titleStyle: function () {
      return {
        width: this.flagWidth + "px",
        // margin: "auto",
      };
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background: black;

  margin-top: 0px;
  padding: 0;
  margin: 0;
  min-width: 320px;
  touch-action: pan-x pan-y;
}

/* Link colors */
#app a {
  /* color: #ef3b2c; */
  color: #4292c6;
  /* color: #2171b5; */
  /* color: #084594; */
}

html,
body,
#app {
  background: black;
  /* min-height: 100%; */
  height: 100%;
}

hr {
  background-color: lightgrey;
}

#svg-flag {
  /* border: 1px solid grey; */
  padding-top: 5px;
  padding-bottom: 20px;
}

/* To allow plotting outside of svg boundaries */
svg {
  overflow: visible !important;
}

/* Controls fading in and out of points when hovering over flag */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Grid wrapper */
#flex-column {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}

#title-box {
  flex: 1;
  padding-top: 1rem;
  /* border: 1px #ccc solid; */
}

#description-box {
  flex: 1;
  /* border: 1px #ccc solid; */
}

#description-box p {
  margin-bottom: 0rem;
  /* border: 1px #ccc solid; */
}

#options-box {
  flex: 1;
  margin-bottom: 1rem;
  /* border: 1px #ccc solid; */
}

#flag-hover-zone {
  flex: 1;
  /* border: 1px #ccc solid; */
}

#footer {
  flex: 1;
  /* border: 1px #ccc solid; */
}

/* Title and description at top of page */
.flex-box {
  display: flex;
  justify-content: center;
}

#title {
  text-align: middle;
}

#description {
  text-align: center;
}

#options-box {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  align-items: center;
}

/* State selector */
/* #state-selector { */
/* border: 0.5px #ccc solid; */
/* } */

#select-box {
  min-width: 100px;
  display: inline-block;
  padding-left: 5px;
}

.v-select .vs__dropdown-toggle {
  background: white !important;
}

/* Temperature selector */
#temp-toggle {
  /* text-align: middle; */
  min-width: 75px;
  /* border: 0.5px #ccc solid; */
}

.temp-toggle-span {
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  /* border: 0.5px #ccc solid; */
}

#temp-toggle label {
  padding-left: 0.05rem;
  padding-right: 0.05rem;
  /* border: 0.5px #ccc solid; */
}

/* Show data */
#show-data-checkbox {
  /* border: 0.5px #ccc solid; */
  display: inline-block;
  vertical-align: middle;
}

#show-data-checkbox label {
  margin-left: 5px;
}

/*  */
@media all and (min-width: 1024px) {
  #description,
  #select-box,
  #choose-state-text,
  label {
    font-size: 1rem;
  }

  input[type="radio"] {
    border: 0px;
    height: 1em;
  }

  #flag-hover-zone {
    margin-bottom: 100px;
  }
}

@media all and (max-width: 1024px) {
  #description,
  #select-box,
  #choose-state-text,
  label {
    font-size: 1rem;
  }

  input[type="radio"] {
    border: 0px;
    height: 1em;
  }

  #flag-hover-zone {
    margin-bottom: 100px;
  }
}
@media all and (max-width: 839px) {
  #description,
  #select-box,
  #choose-state-text,
  label {
    font-size: 0.75rem;
  }
  input[type="radio"] {
    border: 0px;
    height: 0.75em;
  }

  #flag-hover-zone {
    margin-bottom: 75px;
  }

  .temp-toggle-span {
    display: inline;
  }
}
@media all and (max-width: 480px) {
  #description,
  #select-box,
  #choose-state-text,
  label {
    font-size: 0.55rem;
  }

  input[type="radio"] {
    border: 0px;
    height: 0.6em;
  }

  #flag-hover-zone {
    margin-bottom: 60px;
  }

  .temp-toggle-span {
    display: block;
  }
}
</style>
