<template>
    <div class="">
        <div class="">
            <div class="">
                <h2 class="mb-8 text-2xl text-cyan-900 font-bold">Parkings</h2>
                <div class="flex justify-center my-2 mx-4 md:mx-0">
                    <form class="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-full px-3 mb-6">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for='Password'>name</label>
                                <input
                                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="text" v-model="name" name="name" id="name" aria-describedby="emailHelp"
                                    placeholder="parking#">
                            </div>
                            <div class="w-full md:w-full px-3 mb-6">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for='Password'>Lat</label>
                                <input
                                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    type="text" v-model="lat" name="lat" id="lat" placeholder="lat">
                            </div>
                            <div class="w-full md:w-full px-3 mb-6">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for='Password'>Lng</label>
                                <input
                                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                    v-model="lng" name="lng" id="lng" aria-describedby="lngHelp" placeholder="lng">
                            </div>
                        </div>
                        <button type="button" @click='createParking()' class="btn btn-danger">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'CreateParking',
    data() {
        return {
            name: '',
            lat: '',
            lng: ''
        }
    },
    methods: {
        createParking() {
            console.log(this.name)
            const payload = {
                name: this.name,
                lat: this.lat,
                lng: this.lng
            }
            this.$emit('createParking', payload)
            this.clearForm();
        },
        clearForm() {
            this.name = "";
            this.lat = "";
            this.lng = "";
        }
    }
}
</script>