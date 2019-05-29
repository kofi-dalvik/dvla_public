import { axios } from './index';

const api = {
    index: 'institutions',
    create: 'institutions',
    update: 'institutions',
    deleteInstitution: 'institutions',
    types: 'institution_types'
};

export default {
    /**
     * Gets institutions
     *
     * @param params
     * @returns {Object}
     */
    getInstitutions (params) {
        return axios.get(api.index)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },


    /**
     * Creates new institution
     *
     * @param {Object} data
     * @returns {Object}
     */
    createInstitution (data) {
        return axios.post(api.create, data)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Updates institution
     *
     * @param {Object} data
     * @returns {Object}
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
     * Gets institution types
     *
     * @param {Object} params
     */
    getInstitutionTypes (params) {
        return axios.get(api.types, {params})
        .then(resposne => {
            return Promise.resolve(resposne.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Deletes institution
     *
     * @param {Number} id
     * @return {Object}
     */
    deleteInstitution (id) {
        return axios.delete(api.deleteInstitution + '/' + id)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        })
    }
}