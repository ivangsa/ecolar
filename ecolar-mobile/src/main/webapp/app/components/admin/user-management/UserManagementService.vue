<script>
    import axios from 'axios';

    export default {
        name: 'UserManagementService',
        methods: {
            get: function(login) {
                return axios.get(`api/users/${login}`);
            },
            create: function(user) {
                return axios.post('api/users', user);
            },
            update: function(user) {
                return axios.put('api/users', user);
            },
            remove: function (userId) {
                return axios.delete(`api/users/${userId}`);
            },
            query: function(req) {
                let sorts = '';
                for (let idx in req.sort) {
                    if (sorts.length > 0) {
                        sorts += '&';
                    }
                    sorts += 'sort=' + req.sort[idx];
                }
                return axios.get(`api/users?${sorts}&page=${req.page}&size=${req.size}`);
            },
            retrieveAuthorities: function() {
                return axios.get('api/users/authorities');

            }
        }
    }
</script>
