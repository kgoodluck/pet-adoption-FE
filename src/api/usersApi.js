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
        const res = await axios.post(`${baseUrl}/login`, user);
        res.ok = true;
        return res;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export { signUpUserApi, loginUserApi }