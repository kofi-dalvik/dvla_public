import { axios } from './index';

const api = {
    index: 'incident_updates'
};

export default {
    /**
     * Gets incident updates
     *
     * @param {Object} params
     * @returns {Object}
     */
    index(params) {
        return axios.get(api.index, {
            params
        }).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    }
}