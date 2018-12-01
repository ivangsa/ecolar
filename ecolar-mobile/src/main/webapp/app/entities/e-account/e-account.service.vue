<script>
import axios from 'axios';

const baseApiUrl = 'api/e-accounts';

const EAccountService = {
    methods: {
        findEAccount(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveEAccounts() {
            return axios.get(baseApiUrl);
        },
        deleteEAccount(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createEAccount(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateEAccount(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default EAccountService;

</script>
