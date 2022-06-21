import axios from 'axios';

export const accountsConfig = axios.create({
	baseURL: "http://192.168.1.2:8000/",
});
export const supportsConfig = axios.create({
	baseURL: "http://192.168.1.2:8001/",

});