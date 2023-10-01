import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Replace with your API base URL
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
    // api.defaults.headers['Access-Control-Allow-Origin'] = '*';
    const userData = JSON.parse(localStorage.getItem("token"));
    // ** If token is present add it to request's Authorization Header
    if (userData) {
    //   if (config.headers) {
    //     config.headers.username = userData.username;
    //     config.headers.roomid = userData.roomid;
    //   }
    }
    return config;
  }
);

export default api;