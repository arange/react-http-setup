import Axios from "axios";

const instance = Axios.create({
        baseURL: "http://localhost:3004"
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;