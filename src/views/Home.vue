<template>
  <div class="mapContainer">
    <l-map @ready="onStart()" ref="mymap" v-model="zoom" v-model:zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
      <l-control class="clickControl" :position="position">
        <p @click="showClick">Control</p>
      </l-control>
    </l-map>
    <div class="controller">
      Controls:
      <div>
        <p>Lat:</p>
        <form action="">
          <input
            v-model.number="latitude"
            type="numbers"
            placeholder="lattitude"
          />
        </form>

        <p>Lng:</p>
        <form action="">
          <input
            v-model.number="longitude"
            type="numbers"
            placeholder="longitude"
          />
        </form>
        <br />
        <button @click="flyToTarget()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControl,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Home",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControl,
  },
  data() {
    return {
      map: null,
      zoom: 13,
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      center: [51.505, -0.09],
      position: "topright",
      latitude: "",
      longitude: "",
    };
  },
  methods: {
    onStart(){
      // this.$nextTick(() => {
      this.map = this.$refs.mymap.mapObject;
    // });
    },
    showClick() {
      console.log("clicked");
    },
    flyToTarget() {
      console.log("lat " + this.latitude + " and " + "lng " + this.longitude);
      this.map.flyTo(this.center, 13);
    },
  },
};
</script>

<style scoped>
.mapContainer {
  height: 65vh;
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
  /* border: 1px solid black; */
  height: 33vh;
  width: 100%;
}
</style>