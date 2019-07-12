import Axios from 'axios'
const instance = Axios.create({
    baseURL: 'https://opensky-network.org/api/',
    headers: {}
});
export default instance;