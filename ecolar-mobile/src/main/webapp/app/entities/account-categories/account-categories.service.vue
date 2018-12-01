<script>
import axios from 'axios';

const baseApiUrl = 'api/account-categories';

const AccountCategoriesService = {
    methods: {
        findAccountCategories(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveAccountCategoriess() {
            return axios.get(baseApiUrl);
        },
        deleteAccountCategories(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createAccountCategories(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateAccountCategories(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default AccountCategoriesService;

</script>
