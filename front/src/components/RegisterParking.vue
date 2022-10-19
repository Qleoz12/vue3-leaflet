<template>
    <!-- component -->
    <div class=" h-screen bg-gray-100">
        <h1 class="text-4xl uppercase font-extrabold">register trip arrive</h1>
        <div class="text-left">
            <form>
                <div class="mt-5 bg-white rounded-lg shadow">
                    <div class="flex">
                        <div class="flex-1 py-5 pl-5 overflow-hidden">
                            <svg class="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px"
                                xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g>
                                    <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1"
                                        stroke="null"></path>
                                    <path
                                        d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                                        id="svg_2"></path>
                                    <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                                </g>
                            </svg>
                            <h1 class="inline text-2xl font-semibold leading-none">destination</h1>
                        </div>
                    </div>
                    <div class="px-5 pb-5">
                        <input v-model="destination" placeholder="destination"
                            class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">

                        <select v-model="destination">
                            <option v-for="item in parkings" :value="item.name">{{item.name}}</option>
                        </select>
                        <input v-model="arriving" placeholder="arriving"
                            class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">

                    </div>
                    <div class="flex">
                        <div class="flex-1 py-5 pl-5 overflow-hidden">
                            <input v-model="placa" placeholder="placa"
                                class=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                        </div>
                    </div>
                    <hr class="mt-4">
                    <div class="flex flex-row-reverse p-3">
                        <div class="flex-initial pl-3">
                            <button type="button" @click='registerTrip()'
                                class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                                    fill="#FFFFFF">
                                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                                    <path
                                        d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                                        opacity=".3"></path>
                                    <path
                                        d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z">
                                    </path>
                                </svg>
                                <span class="pl-2 mx-1">Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script>

import { getTrip } from '../services/parkingService'
import 'boxicons'
import 'boxicons/css/boxicons.min.css'
import { getParkings, getAllParkingBuses } from '../services/parkingService'

export default {

    name: 'registerParking',
    props: ['parkingsBuses'],
    computed: {
        numPages() {
            return this.itemsTotal / this.itemsPerPage;
        },
        pageFirstItem() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        pageLastItem() {
            return this.currentPage * this.itemsPerPage;
        }
    },
    data() {
        return {
            trips: [],
            parkings: [],
            busParkings: [],
            destination:null,
            origin:null

        }
    },
    methods: {


        registerTrip() {
            console.log(this.name)
            const payload = {
                origen: this.origin,
                destino: this.destination,
                leaving: this.leaving,
                arriving: this.arriving,
                bus_placa: this.placa
            }
            this.$emit('createTrip', payload)
            this.clearForm();
        },
        confirmTrip(e) {
            console.log(e)
            this.$emit('confirmTrip', e)
        },
        cancelTrip(e) {
            console.log(e)
            this.$emit('cancelTrip', e)
        },
        clearForm() {
            this.origin = ""
            this.destination = ""
            this.leaving = ""
            this.arriving = ""
            this.placa = ""
        },
        getAllParkingBuses() {
            this.$emit('getAllParkingBuses')
        },
        back() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        forward() {
            if (this.currentPage < this.numPages) {
                this.currentPage++;
            }
        },
        getParkings() {
            Promise.all([getParkings(), getAllParkingBuses()])
                .then(([res, res2]) => {

                    this.parkings = res.data.parkings;
                    this.busParkings = res2.data.busParkings;

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {

        console.log(`the component is now mounted.`)
        this.getTrip();
        this.getParkings();
    }
}
</script>