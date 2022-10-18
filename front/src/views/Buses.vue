<template>
  <!-- <div class="mapContainer">
  </div> -->
  <listBuses @createTrip="Create($event)" />
</template>

<script>
// @ is an alias to /src
import listBuses from "../components/ListBuses.vue";
import { getAllParkingBuses } from '../services/parkingService'

export default {
  name: "Buses",
  components: {
    listBuses
  },
  mounted() {
    console.log(`the component is now mounted.`)
    this.getAllParkingBuses()

  },
  data() {
    return {
      parkingsBuses: []
    }
  },
  computed: {

  },
  methods: {
    onLoad() {



    },
    getAllParkingBuses() {
      Promise.all([getAllParkingBuses()])
        .then(([res]) => {

          this.parkingsBuses = res.data.busParkings;

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    Create(data) {
      console.log('data:::', data)
      createTrip(data).then(response => {
        console.log(response);
        this.getAllParkingBuses();
      })
        .catch(function (error) {
          console.log(error);
        });
    }


  },
};
</script>

<style scoped>
.mapContainer {
  height: 45vh;
  width: 100%;
  z-index: 100;
  border: 1px solid black;
}

.clickControl {
  background: #fff;
  padding: 0 0.5rem;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}

.controller {
  height: 33vh;
  width: 100%;
}
</style>

<style>
.leaflet-routing-container {
  display: none;
}
</style>