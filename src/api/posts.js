import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3500' //creates instance of API access point - update port etc. before going to production
})

// run instance of npx json-server -p  3500 -w data/db.json where p = port and w = folder to watch i.e. specifies the data for the server