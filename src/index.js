import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';

// setting global config for axios
Axios.defaults.baseURL = "http://localhost:3004";
Axios.defaults.headers.common['Authorization'] = "AUTH TOKEN";
Axios.defaults.headers.post['Content-Type'] = 'application/json';

// interceptor, do things globally
// var myInterceptor = 
Axios.interceptors.request.use(request => {
    console.log(request);
    // you can add some headers here, e.g. authorisation
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// get rid of interceptors
// axios.interceptors.request.eject(myInterceptor);

Axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
