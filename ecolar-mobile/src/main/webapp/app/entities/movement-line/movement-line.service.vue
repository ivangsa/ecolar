<script>
import axios from 'axios';

const baseApiUrl = 'api/movement-lines';

const MovementLineService = {
    methods: {
        findMovementLine(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveMovementLines() {
            return axios.get(baseApiUrl);
        },
        deleteMovementLine(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createMovementLine(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateMovementLine(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default MovementLineService;

</script>
