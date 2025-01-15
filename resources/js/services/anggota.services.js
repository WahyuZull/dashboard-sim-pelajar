import axios from "axios"

export const getAnggota = () => {
    return axios.get(`/anggota`);
}