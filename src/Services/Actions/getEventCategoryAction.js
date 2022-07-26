import * as types from '../Constants/index';
import axios from 'axios';

const getEventCategory = (eventCategory) => ({
    type: types.GET_EVENT_CATEGORY,
    payload: eventCategory,
});

// get all event category
export const loadEventCategory = () => {
    return function (dispatch) {
        let user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        if (user) {
            axios.post(`https://apiserver.msgmee.com/post/getEventCategory`,{},config)
                .then((res) => {
                    dispatch(getEventCategory(res.data.data.successResult.rows))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
};
