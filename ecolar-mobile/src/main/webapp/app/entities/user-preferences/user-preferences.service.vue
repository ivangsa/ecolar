<script>
import axios from 'axios';

const baseApiUrl = 'api/user-preferences';

const UserPreferencesService = {
    methods: {
        findUserPreferences(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveUserPreferencess() {
            return axios.get(baseApiUrl);
        },
        deleteUserPreferences(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createUserPreferences(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateUserPreferences(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default UserPreferencesService;

</script>
