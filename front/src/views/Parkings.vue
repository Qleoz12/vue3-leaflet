<template>
  <div class="space-x-44">
    <Header />
    <div class="">

      <div class="">
        <CreateParking @createParking="userCreate($event)" />
      </div>

      <listParking :numberOfUsers="numberOfUsers" :parkings="parkings" />
      <listParkingBuses :numberOfUsers="numberOfUsers" :parkingsBuses="busParkings" />


    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>

import CreateParking from '../components/CreateParking.vue'
import ListParking from '../components/ListParking.vue'
import ListParkingBuses from '../components/ListParkingBuses.vue'
import { getParkings, createParking, getAllParkingBuses } from '../services/parkingService'

export default {
  name: 'Parkings',
  components: {
    CreateParking,
    ListParking,
    ListParkingBuses

  },
  data() {
    return {
      parkings: [],
      busParkings: [],
      numberOfUsers: 0
    }
  },
  methods: {
    getParkings() {
      Promise.all([getParkings(),getAllParkingBuses()])
        .then(([res,res2]) => {

          this.parkings = res.data.parkings;
          this.busParkings = res2.data.busParkings;

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    userCreate(data) {
      console.log('data:::', data)
      createParking(data).then(response => {
        console.log(response);
        this.getAllUsers();
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted() {

    console.log(`the component is now mounted.`)
    this.getParkings();
  }
}
</script>