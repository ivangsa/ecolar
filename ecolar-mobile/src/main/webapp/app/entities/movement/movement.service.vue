<script>
import axios from 'axios';

const baseApiUrl = 'api/movements';

const MovementService = {
    methods: {
        findMovement(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveMovements() {
            return axios.get(baseApiUrl);
        },
        deleteMovement(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createMovement(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateMovement(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default MovementService;

</script>
