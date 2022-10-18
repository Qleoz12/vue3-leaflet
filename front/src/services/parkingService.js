const axios = require('axios').default;

export async function getParkings() {

    return axios.get('http://localhost:9090/parkings/get');
    
}

export async function getAllParkingBuses() {

    return axios.get('http://localhost:9090/busesparking/get');
    
}


export async function createParking(data) {
    return axios.post(`http://localhost:9090/parkings/create`, {
            
            name: data.name,
            locations: {
                lat: Number(data.lat),
                lng: Number(data.lng),
            },
            capacity: data.capacity
        })
      
}



export async function createTrip(data) {
    return axios.post(`http://localhost:9090/trip/create`, {
            
        
            origen: data.origen,
            destino: data.destino,
            leaving: data.leaving,
            arriving: data.arriving,
            bus_placa: data.placa
        
        })
      
}

export async function getTrip(data) {
    return axios.get(`http://localhost:9090/trip/get`)
      
}