import axios from "axios";

export const getCaptcha = () => {
    return axios.get("/captcha/api/math");
}

export const getNewCaptcha = () => {
    return axios.get("/captcha/api/math");
}
