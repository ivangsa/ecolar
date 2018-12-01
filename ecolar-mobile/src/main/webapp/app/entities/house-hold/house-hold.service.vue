<script>
import axios from 'axios';

const baseApiUrl = 'api/house-holds';

const HouseHoldService = {
    methods: {
        findHouseHold(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveHouseHolds() {
            return axios.get(baseApiUrl);
        },
        deleteHouseHold(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createHouseHold(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateHouseHold(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default HouseHoldService;

</script>
