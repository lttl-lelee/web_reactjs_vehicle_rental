import axiosClient from "../services/axiosClient";
import axios from "axios";

const urlAPI = 'http://127.0.0.1:8000/api';

const vehicleApi = {
    createCar: function (data) {
        const url = '/register/car';
        return axiosClient.post(url, data);
    },
    createBike: function (data) {
        const url = '/register/bike';
        return axiosClient.post(url, data);
    },
    updateCar: function (data) {
        const url = '/update/car';
        return axiosClient.post(url, data);
    },
    updateBike: function (data) {
        const url = '/update/bike';
        return axiosClient.post(url, data);
    },
    getMyVehicles: function () {
        const url = '/MyVehicles';
        return axiosClient.get(url);
    },
    getVehicle: function (params) {
        const url = '/getVehicle';
        return axiosClient.get(url, { params });
    },
    getCarDriver: function () {
        const url = '/CarsDriver';
        return axiosClient.get(url);
    },
    getCarSelfDriver: function (params) {
        const url = '/CarSelfDriver';
        return axiosClient.get(url, { params });
    //     return newPro
    //     axios.get(`${urlAPI}/CarSelfDriver`)
    //   .then(res => {
    //    console.log(res);
    //   })
    //   .catch(error => console.log(error));
    },
    getBikes: function (params) {
        const url = '/Bikes';
        return axiosClient.get(url, { params });
    },
    checkLiked: function (params) {
        const url = '/checkLiked';
        return axiosClient.get(url, { params });
    },
    updateLike: function (params) {
        const url = '/updateLike';
        return axiosClient.get(url, { params });
    },
    getMyFavs: function (params) {
        const url = '/getMyFavs';
        return axiosClient.get(url, { params });
    },
    getBrands: function () {
        const url = '/getBrands';
        return axiosClient.get(url);
    },
    uploadMultipleFiles: function (data) {
        return axiosClient.post("/uploadMultipleFiles", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },

}
export default vehicleApi;