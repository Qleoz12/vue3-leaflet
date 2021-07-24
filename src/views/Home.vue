<template>
  <div class="mapContainer">
    <l-map
      :use-global-leaflet="true"
      @ready="onLoad"
      ref="map"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="center"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
      <l-control class="clickControl" :position="position">
        <p @click="flyToTarget()">Control</p>
      </l-control>
    </l-map>
  </div>
</template>

<script>
// @ is an alias to /src
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControl,
} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import { mapState } from "vuex";
import { onMounted, toRaw } from "vue";

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
      zoom: 5,
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      center: [51.505, -0.09],
      position: "topleft",
      centerLatLng: {},
      currentCenter: Number,
      currentZoom: Number,
      lat: null,
      lng: null,
      marker: null,
      circle: {
        center: null,
        radius: 6,
        color: "red",
      },
    };
  },
  computed: {
    ...mapState(["onMoveLatitude", "onMoveLongitude"]),
  },
  methods: {
    onLoad() {
      this.map = this.$refs.map.leafletObject;
      console.log("Acquiring user position...");
      this.map
        .locate({ setView: true, watch: false, maxZoom: 17 })
        .on("locationfound", (e) => {
          console.log("Position acquired");
          this.lat = e.latitude;
          this.lng = e.longitude;
          this.marker = new L.circleMarker([this.lat, this.lng]).addTo(toRaw(this.map))
        })
        // .circleMarker([this.lat, this.lng])
        // .addTo(toRaw(this.map))
        // .bindPopup("I am here!")
        // .openPopup();
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showClick() {
      console.log("clicked");
    },
    flyToTarget() {
      console.log("Acquiring user position...");
      this.map
        .locate({ setView: false, watch: true })
        .on("locationfound", (e) => {
          console.log("Position acquired");
          this.map.flyTo([e.latitude, e.longitude], 16);
        });
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
  height: 33vh;
  width: 100%;
}
</style>