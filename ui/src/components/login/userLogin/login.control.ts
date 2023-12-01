import { doFetch } from "infrastructure/backendService"
import { API_LOGIN_URL } from './../../../infrastructure/apiUrl';

interface loginFields {
    userName : string;
    password : string;
}

export const makeLoginCall = (fileds : loginFields): any => {
    const userLoginDetails = {
        username : fileds.userName,
        password : fileds.password
    }
    return doFetch({
        url: `${API_LOGIN_URL}/auth/generateToken`,
        config: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoginDetails),
        },
    })
}