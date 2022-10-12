<template>
  <div class="space-x-44">
    <Header />
    <div class="">
      
        <div class="">
          <CreateParking @createParking="userCreate($event)" />
        </div>
        
          <listParking :numberOfUsers="numberOfUsers" :parkings="parkings" />
        
      
    </div>
    <div class="row">
      
    </div>
  </div>
</template>

<script>

import CreateParking from '../components/CreateParking.vue'
import ListParking from '../components/ListParking.vue'
import { getAllUsers, createParking } from '../services/parkingService'
export default {
  name: 'Parkings',
  components: {
    CreateParking,
    ListParking
  },
  data() {
    return {
      parkings: [],
      numberOfUsers: 0
    }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.parkings = response.data.parks;
        this.numberOfUsers = this.parkings.length
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
    this.getAllUsers();
  }
}
</script>