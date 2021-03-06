import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

export default axios.create({ //creates instance of API access point - update port etc. before going to production
    baseURL: BASE_URL, 
    headers: {
        'Content-Type': 'application/json'
    }
});

// run instance of npx json-server -p  3500 -w data/db.json where p = port and w = folder to watch i.e. specifies the data for the server