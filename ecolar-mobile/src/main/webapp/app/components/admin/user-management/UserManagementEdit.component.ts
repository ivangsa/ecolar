import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import LanguageService from '../../../locale/LanguageService.vue';

import UserManagementService from './UserManagementService.vue';

function loginValidator(value) {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true;
  }
  return /^[_.@A-Za-z0-9-]*$/.test(value);
}

const EcoUserManagementEditComponent = {
  name: 'EcoUserManagementEditComponent',
  mixins: [UserManagementService, LanguageService],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userId) {
        vm.init(to.params.userId);
      }
    });
  },
  data() {
    return {
      userAccount: {
        id: null,
        login: null,
        firstName: null,
        lastName: null,
        email: null,
        authorities: [],
        langKey: null
      },
      isSaving: false,
      authorities: []
    };
  },
  validations: {
    userAccount: {
      login: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(254),
        loginValidator
      },
      firstName: {
        maxLength: maxLength(50)
      },
      lastName: {
        maxLength: maxLength(50)
      },
      email: {
        required,
        email,
        minLength: minLength(5),
        maxLength: maxLength(254)
      }
    }
  },
  methods: {
    init: function(userId) {
      this.get(userId).then(res => {
        this.userAccount = res.data;
        this.retrieveAuthorities().then(res => {
          this.authorities = res.data;
        });
      });
    },
    previousState: function() {
      this.$router.go(-1);
    },
    save: function() {
      this.isSaving = true;
      if (this.userAccount.id) {
        this.update(this.userAccount).then(() => {
          this.isSaving = false;
          this.$router.go(-1);
        });
      } else {
        this.create(this.userAccount).then(() => {
          this.isSaving = false;
          this.$router.go(-1);
        });
      }
    }
  }
};

export default EcoUserManagementEditComponent;
