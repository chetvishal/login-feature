

import { createContext, useContext, useState } from "react";
import axios from 'axios';

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {

    const [isUserLoggedIn, setUserLoggedIn] = useState(JSON.parse(localStorage?.getItem('loggedIn'))?.loggedIn || false);
    const { token, email } = JSON.parse(localStorage?.getItem('loggedIn')) || { token: "", email: "" }
    const [userDetails, setUserDetails] = useState({ token, email });

    const loginService = (email, password) => {
        return axios.post(`api/login`, {
            email, password
        }).then((resp) => {
            // setUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn)
            // setUserDetails({ token: resp.data.accessToken, email: resp.data.email })
            // localStorage.setItem("loggedIn", JSON.stringify({ loggedIn: true, token: resp.data.accessToken, email: resp.data.email }))
            console.log("rsp: ", resp)
        }).catch(error => console.log("error: ", error))
    }

    const toggleLoggedIn = () => {
        return new Promise((resolve, reject) => {
            try {
                setUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn)
                resolve({ success: true })
            } catch (error) {
                reject({ success: false })
            }
        })
    }

    const loginUserWithCredentials = async (username, password) => {
        return new Promise((resolve, reject) => {
            try {
                loginService(username, password)
                    .then(resp => {
                        toggleLoggedIn();
                        setUserDetails({ token: resp.data.accessToken, userId: resp.data.userId, username: resp.data.username })
                        localStorage.setItem("loggedIn", JSON.stringify({ loggedIn: true, token: resp.data.accessToken, userId: resp.data.userId, username: resp.data.username }))
                        resolve({ success: true, token: resp.data.accessToken, userId: resp.data.userId })
                    })
                    .catch((err) => {
                        console.log("resp messsage: ", err.response.data.message)
                        reject({ success: false, message: err.response.data.message })
                    }
                    )
            } catch (error) {
                reject({ success: false, error: error.response.data.message })
            }
        })
    }

    const logoutUser = () => {
        toggleLoggedIn()
        localStorage.removeItem('loggedIn')
    }

    return (
        <authContext.Provider value={{ isUserLoggedIn, loginUserWithCredentials, logoutUser, loginService, userDetails, setUserDetails }}>
            {children}
        </authContext.Provider>
    )

}