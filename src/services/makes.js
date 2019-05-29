import { axios } from './index';

const api = {
    create: 'makes',
    index: 'makes',
    delete: 'makes',
    search: 'makes',
    update: 'makes'
};

export default {
    /**
     * Creates a new vehicle make
     *
     * @param {Object} data
     * @returns {Object}
     */
    create (data) {
        return axios.post(api.create, data)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },

    /**
     * Updates make
     *
     * @param {Number} id
     * @param {Object} data
     */
    update (id, data) {
        return axios.put(`${api.update}/${id}`, data)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },

    /**
     * Gets the makes
     *
     * @param {Object} params
     * @returns {Object}
     */
    index (params) {
        return axios.get(api.index, { params })
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },


    /**
     * Searches for makes
     *
     * @param {String} keyword
     * @returns {Object}
     */
    search (keyword) {
        return axios.get(api.search + `?q=${keyword}`)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },


    /**
     * Deletes a given make
     *
     * @param {Object} params
     * @return {Object}
     */
    destroy (params) {
        return axios.delete(api.delete + `/${params.id}`)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    }
}