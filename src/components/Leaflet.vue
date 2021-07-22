<template>
  <div class="mapContainer" id="mymap" @click="flyToTarget"></div>
  <br />
  <button @click="getCurrentCenter">click to fly to current center view</button>
  <br />
  <button @click="getCurrentPosition">click to fly to current position</button>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { toRaw } from "vue";
import L from "leaflet";

export default {
  name: "Leaflet",
  data() {
    return {
      map: null,
      center: [51.505, -0.09],
      lat: Number,
      lng: Number,
      marker: null,
    };
  },
  mounted() {
    const map = L.map("mymap", {
      zoomControl: true,
      zoom: 13,
      zoomAnimation: false,
      fadeAnimation: true,
      markerZoomAnimation: true,
      tap: true,
    })
      .locate({ setView: true, watch: false })
      .on("locationfound", (e) => {
        this.lat = e.latitude;
        this.lng = e.longitude;
        if (this.marker != null) {
          // remove the marker and add a new marker to the map
          this.map.removeLayer(this.marker);
        }
        this.marker = new L.circleMarker([this.lat, this.lng])
          .addTo(toRaw(this.map))
          .bindPopup("I am here!")
          .openPopup();
      });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    this.map = map;
  },
  methods: {
    flyToTarget() {
      this.map.flyTo([51.505, -0.09], 13);
    },
    getCurrentCenter() {
      let coords = this.map.getCenter();
      const { lat, lng } = coords;
      this.lat = lat;
      this.lng = lng;
      this.map.flyTo([this.lat, this.lng], 13);
    },
    getCurrentPosition() {
      console.log("Acquiring position, standby...");
      this.map
        // watch: true - if true, starts continuous watching of location changes
        // setView: false - if true, immedate set user's view to location
        .locate({ setView: false, watch: false })
        .on("locationfound", (e) => {
          this.lat = e.latitude;
          this.lng = e.longitude;
          this.map.flyTo([this.lat, this.lng], 16);
          console.log(
            "Position acquired: latitude " +
              this.lat +
              " and longitude " +
              this.lng
          );
          if (this.marker != null) {
            // remove the marker and add a new marker to the map
            this.map.removeLayer(this.marker);
          }
          this.marker = new L.circleMarker([this.lat, this.lng])
            .addTo(toRaw(this.map))
            .bindPopup("I am here!")
            .openPopup();
        })
        .on("locationerror", (e) => {
          console.log(e);
          alert(
            "Location access denied, please turn on location service on your device"
          );
        });
    },
  },
};
</script>

<style>
.mapContainer {
  height: 65vh;
  width: 100%;
  z-index: 100;
  border: 1px solid black;
}
</style>