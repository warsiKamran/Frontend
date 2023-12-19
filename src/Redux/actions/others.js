import { server } from "../store";
import axios from "axios";

export const contactUs = (name,email,message) => async(dispatch) => {

    try {
        dispatch({type: 'contactRequest'});

        const config = {
            headers:{
                'Content-type': 'application/json',
            },
            withCredentials: true,
        }

        const {data} = await axios.post(`${server}/contact`,{name, email, message},
            config
        );
        dispatch({type: 'contactRequestSuccess', payload: data.message});

    } catch (error) {
        dispatch({
            type: 'contactRequestFail', 
            payload: error.response.data.message
        })
    }
};

export const courseRequest = (name,email,course) => async(dispatch) => {

    try {
        dispatch({type: 'courseRequest'});

        const config = {
            headers:{
                'Content-type': 'application/json',
            },
            withCredentials: true,
        }

        const {data} = await axios.post(`${server}/courserequest`,{name, email, course},
            config
        );
        dispatch({type: 'courseRequestSuccess', payload: data.message});

    } catch (error) {
        dispatch({
            type: 'courseRequestFail', 
            payload: error.response.data.message
        })
    }
};

