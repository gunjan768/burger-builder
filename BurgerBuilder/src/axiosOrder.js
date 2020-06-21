import axios from 'axios';

const instance = axios.create(
{
    baseURL: "https://react-my-burger-c2eeb.firebaseio.com/"
})

export default instance;