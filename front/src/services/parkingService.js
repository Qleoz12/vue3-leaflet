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
            bus_placa: data.bus_placa
        
        })
      
}

export async function confirmTrip(data) {
    return axios.put(`http://localhost:9090/trip/update/`+data.id, {
            
            status:false,
            complete:true
        })
      
}

export async function getTrip(data) {
    return axios.get(`http://localhost:9090/trip/get`)
      
}