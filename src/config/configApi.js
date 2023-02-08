import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001'
    //baseURL: "http://15.229.119.177:3001" 
});