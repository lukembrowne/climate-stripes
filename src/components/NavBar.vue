<template>
  <div id="titleArea">
    <!-- <b-container>
      <b-row class="text-center">
        <b-col>
          <h5>Stars and Warming Stripes</h5>
        </b-col>
      </b-row>
    </b-container> -->

    <b-container>
      <b-row class="text-center">
        <!-- First column -->
        <!-- <b-col lg="3" sm="12">Stars and Warming Stripes</b-col> -->

        <!-- Second column -->
        <b-col>
          <a href="#" @click="modalShow = !modalShow"
            >What are warming stripes?</a
          >
          <!-- Modal describing website -->
          <b-modal
            centered
            v-model="modalShow"
            title="What are warming stripes?"
            header-bg-variant="dark"
            header-text-variant="light"
            body-bg-variant="dark"
            body-text-variant="light"
            footer-bg-variant="dark"
            footer-text-variant="light"
            ok-only
            ok-variant="primary"
            size="lg"
          >
            <p class="my-4">
              <a
                href="https://en.wikipedia.org/wiki/Warming_stripes"
                target="_blank"
                >Warming stripes</a
              >
              are a popular way to visualize how average temperatures have
              changed over the past century or so. Each vertical stripe
              represents the average temperature for a given year, usually
              between 1900-2019, with cooler temperatures shown in blue and
              warmer temperatures in red.
            </p>
            <p class="my-4">
              The data used in this website come from
              <a href="http://berkeleyearth.org/data-new/" target="_blank"
                >Berkeley Earth</a
              >, a non-profit organization that provides high quality,
              open-source global climate datasets. Inspiration for building this
              website came from Professor Ed Hawkins (University of Reading) and
              the website
              <a href="https://showyourstripes.info/" target="_blank"
                >showyourstripes.info</a
              >
              , which generates warming stripes for most countries in the world.
              This website was built using a combination of R for data analysis
              with Vue.js.
            </p>
            <p class="my-4">
              This website is provided under a
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                >CC-BY 4.0 license</a
              >. Please feel free to share and adapt! Reach out to me anytime
              at: lukembrowne@gmail.com
            </p>
          </b-modal></b-col
        >
      </b-row>
    </b-container>

    <b-container>
      <b-row class="text-center">
        <!-- Third column -->
        <b-col>
          <b-nav-text style="color: white">Choose a state:</b-nav-text
          ><v-select
            id="select-box"
            v-model="selectedState"
            @input="updateSelectedState($event)"
            :options="stateList"
            :reduce="(state) => state.state"
            label="state"
          >
          </v-select>

          <!-- Toggle to select C or F -->
          <!-- <div id="test" style="display: inline-block">
            <b-form-group>
              <b-form-radio v-model="fahrenSelected" :value="true"
                >F°</b-form-radio
              >
              <b-form-radio v-model="fahrenSelected" :value="false"
                >C°</b-form-radio
              >
            </b-form-group>
          </div> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      modalShow: false,
      test: "F",
      selectedState: String,
    };
  },

  props: {
    stateList: Array,
  },
  methods: {
    updateSelectedState(event) {
      this.$emit("updateSelectedState", event);
    },
    toggleTemp(event) {
      this.$emit("toggleTemp", event);
    },
  },
  computed: {
    // selectedState: {
    //   get() {
    //     return this.selectedState;
    //   },
    //   set(value) {
    //     this.$store.commit("updateSelectedState", value);
    //   },
    // },

    fahrenSelected: {
      get() {
        return this.$store.state.fahrenSelected;
      },
      set(value) {
        this.$store.commit("updateFahrenSelected", value);
      },
    },
  },
};
</script>

<style>
#titleArea {
  max-width: 1200px;
  /* margin: 0 auto; */
  background: black !important;
}

.v-select .vs__dropdown-toggle {
  background: white !important;
}
</style>