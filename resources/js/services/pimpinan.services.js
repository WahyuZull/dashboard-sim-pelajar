import axios from "axios";

export const getPimpinanCabang = () => {
    return axios.get("/pimpinan/cabang");
};

export const getPimpinanAnakCabang = (cabangId) => {
    return axios.get(`/pimpinan/anak-cabang/${cabangId}`);
};

export const getPimpinanRanting = (anakCabangId) => {
    return axios.get(`/pimpinan/ranting/${anakCabangId}`);
};

export const getPimpinanKomisariat = (anakCabangId) => {
    return axios.get(`/pimpinan/komisariat/${anakCabangId}`);
};
