import axios from 'axios';

export const ERSClient = axios.create({
   baseURL: 'http://neftalypolancop1ebs-env-1.eba-csztsydi.us-east-1.elasticbeanstalk.com/',
   //baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});