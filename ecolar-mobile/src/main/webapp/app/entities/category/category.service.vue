<script>
import axios from 'axios';

const baseApiUrl = 'api/categories';

const CategoryService = {
    methods: {
        findCategory(id) {
            return axios.get(`${baseApiUrl}/${id}`);
        },
        retrieveCategorys() {
            return axios.get(baseApiUrl);
        },
        deleteCategory(id) {
            return axios.delete(`${baseApiUrl}/${id}`);
        },
        createCategory(entity) {
            return axios.post(`${baseApiUrl}`, entity);
        },
        updateCategory(entity) {
            return axios.put(`${baseApiUrl}`, entity);
        }
    }
};

export default CategoryService;

</script>
