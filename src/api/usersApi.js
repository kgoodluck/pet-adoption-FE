import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const baseUrl = 'http://localhost:8080/users'

const signUpUserApi = async(user) => {
    try {
        const res = await axios.post(`${baseUrl}/signup`, user);
        console.log('res', res);
        if (res.status === 200) return { ok: true };
    } catch(err) {
        console.log(err);
        return { fail: err.response.data};
    }
}

const loginUserApi = async(user) => {
    try {
        const res = await axios.post(`${baseUrl}/login`, user, {withCredentials: true});
        return res;
    } catch(err) {
        console.log(err);
        return err;
    }
}

const logoutUserApi = async(user) => {
    const res = await axios.post(`${baseUrl}/logout`, user, {withCredentials: true});
    return res;
}

const getUserDataApi = async(id) => {
    const res = await axios.get(`${baseUrl}/getUserData/${id}`, {withCredentials: true});
    console.log('getUserData res', res);
    return res;
}

const editUserProfileApi = async(newData) => {
    try {
        const res = await axios.put(baseUrl, newData, {withCredentials: true});
        console.log('res', res);
        return res;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export { signUpUserApi, loginUserApi, logoutUserApi, getUserDataApi, editUserProfileApi }