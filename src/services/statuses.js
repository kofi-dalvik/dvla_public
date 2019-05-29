import { axios } from './index';


const api = {
    index: 'statuses'
};

export default {
    /**
     * Gets all user statuses
     *
     * @param {Object} params
     * @returns {Object}
     */
    index (params) {
        return axios.get(api.index, { params }).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    }
}