<template>
    <div class="display-board">
        <div></div>
        <div class="max-w-2xl mx-auto">

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="p-4">
                </div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                bus
                            </th>
                            <th scope="col" class="px-6 py-3">
                                parquadero
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item in parkingsBuses"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td class="px-6 py-4">
                                {{item.parking_alias}}
                            </td>
                            <td class="px-6 py-4">
                                {{item.bus_placa}}
                            </td>
                            <td class="px-6 py-4">
                                {{item.status ? "activo": "inactivo"}} 
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    </div>

</template>

<script>
export default {

    name: 'listParkingBuses',
    props: ['numberOfUsers', 'parkingsBuses'],
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
    methods: {
        getAllUsers() {
            this.$emit('getAllUsers')
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
    }
}
</script>