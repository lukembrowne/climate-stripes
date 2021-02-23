<template>
  <div id="info-pane">
    <h2>
      State: {{ this.$store.getters.selectedState }} | Year:
      {{ this.$store.getters.currentYear }} | Fill:
      {{ this.$store.getters.currentFill }} | Anom:
      {{ this.$store.getters.currentAnom }}
    </h2>

    <!-- Select box -->
    <h2>Select state:</h2>
    <v-select
      id="select-box"
      v-model="selectedState"
      @input="updateSelectedState($event)"
      :options="stateList"
      :reduce="(state) => state.state"
      label="state"
    >
    </v-select>
    <h2>Selected state: {{ selectedState }}</h2>

    <!-- Button to randomize states -->
    <div>
      <b-button variant="primary" @click="randomizeStates"
        >Randomize state</b-button
      >
      <b-button v-b-tooltip.hover title="Tooltip directive content">
        Hover Me
      </b-button>
    </div>

    <!-- Toggle to select C or F -->
    <b-form-checkbox
      id="fahrenCheckbox"
      v-model="fahrenSelected"
      @input="toggleTemp"
      switch
    >
      Display in Fahrenheit
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "InfoPane",

  props: {
    stateList: Array,
  },
  methods: {
    randomizeStates(event) {
      // to call method from parent, emit even from child and component definition in app.vs needs to use v-on: directive, referncing the method in the parenet that will be called
      this.$emit("randomizeStates");
    },
    updateSelectedState(event) {
      this.$emit("updateSelectedState", event);
    },
    toggleTemp(event) {
      this.$emit("toggleTemp", event);
    },
  },
  computed: {
    selectedState: {
      get() {
        return this.$store.state.selectedState;
      },
      set(value) {
        this.$store.commit("updateSelectedState", value);
      },
    },

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
#info-pane {
  border: 2px solid white;
}

.v-select .vs__dropdown-toggle {
  background: white !important;
}
</style>

