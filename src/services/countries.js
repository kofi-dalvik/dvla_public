import {
    axios
} from './index';

export default {
    /**
     * Get all countries.
     *
     * @param {Object} params
     * @return {Object}
     */
    all(params) {
        return axios.get('countries', {
                params: params
            })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    }
};