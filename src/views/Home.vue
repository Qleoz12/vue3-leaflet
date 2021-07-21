<template>
  <div class="mapContainer">
    <l-map v-model="zoom" v-model:zoom="zoom">

    </l-map>
  </div>
</template>

<script>
// @ is an alias to /src
import {LMap, LTileLayer, LControlLayers} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: 'Home',
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
  },
  data() {
    return {
      zoom: 15,
    }
  },
  computed: {

  },
}
</script>

<style scoped>
  .mapContainer{
    height: 96vh;
    width: 100vh;
  }
</style>