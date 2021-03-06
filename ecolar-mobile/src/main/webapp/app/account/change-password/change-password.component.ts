import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import axios from 'axios';
import { mapGetters } from 'vuex';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import Principal from '../principal';

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
export default class ChangePassword extends Vue {
    success: string = null;
    error: string = null;
    doNotMatch: string = null;
    resetPassword: any = {
        currentPassword: null,
        newPassword: null,
        confirmPassword: null
    };
    @Inject('principal') private principal: () => Principal;

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

    public get username(): string {
        return this.principal().username;
    }
}
