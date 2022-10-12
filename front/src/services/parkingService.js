const axios = require('axios').default;

export async function getAllUsers() {

    return axios.get('http://localhost:9090/parkings/get');
    
}
export async function createParking(data) {
    return axios.post(`http://localhost:9090/parkings/create`, {
            
            name: data.name,
            locations: {
                lat: data.lat,
                lng: data.lng,
            }
        })
      
}