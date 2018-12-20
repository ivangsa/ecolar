import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import axios from 'axios';
import Principal from '../principal';
import { mapGetters } from 'vuex';
import Component, { mixins } from 'vue-class-component';

const validations = {
  resetPassword: {
    currentPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    },
    confirmPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    }
  }
};

@Component({
  validations,
  computed: {
    ...mapGetters(['account'])
  }
})
export default class ChangePassword extends mixins(Principal) {
  success: string;
  error: string;
  doNotMatch: string;
  resetPassword: any;

  constructor() {
    super();
    this.success = null;
    this.error = null;
    this.doNotMatch = null;
    this.resetPassword = {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null
    };
  }

  public changePassword(): void {
    if (this.resetPassword.newPassword !== this.resetPassword.confirmPassword) {
      this.error = null;
      this.success = null;
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      let vm = this;
      axios
        .post('api/account/change-password', {
          currentPassword: this.resetPassword.currentPassword,
          newPassword: this.resetPassword.newPassword
        })
        .then(() => {
          vm.success = 'OK';
          vm.error = null;
        })
        .catch(() => {
          vm.success = null;
          vm.error = 'ERROR';
        });
    }
  }
}
