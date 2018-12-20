import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { required, minLength, maxLength, helpers, email } from 'vuelidate/lib/validators';
import LoginModalService from '@/components/account/login-modal.service';
import RegisterService from '@/components/account/register/register.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '@/constants';

const loginPattern = helpers.regex('alpha', /^[_.@A-Za-z0-9-]*$/);
const validations: any = {
  registerAccount: {
    login: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
      pattern: loginPattern
    },
    email: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(254),
      email
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    }
  },
  confirmPassword: {
    required,
    minLength: minLength(4),
    maxLength: maxLength(254)
  }
};
@Component({
  validations
})
export default class Register extends Vue {
  @Inject('registerService') private registerService: () => RegisterService;
  @Inject('loginModalService') private loginModalService: () => LoginModalService;
  public registerAccount: any;
  public confirmPassword: any;
  public doNotMatch: string;
  public error: string;
  public errorEmailExists: string;
  public errorUserExists: string;
  public success: boolean;

  constructor() {
    super();
    this.confirmPassword = null;
    this.doNotMatch = '';
    this.error = '';
    this.errorEmailExists = '';
    this.errorUserExists = '';
    this.registerAccount = {
      login: undefined,
      email: undefined,
      password: undefined
    };
    this.success = false;
  }

  public register(): void {
    if (this.registerAccount.password !== this.confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.registerAccount.langKey = this.$store.getters.currentLanguage;
      this.registerService()
        .processRegistration(this.registerAccount)
        .then(() => {
          this.success = true;
        })
        .catch(error => {
          this.success = null;
          if (error.response.status === 400 && error.response.data.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
          } else if (error.response.status === 400 && error.response.data.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
          } else {
            this.error = 'ERROR';
          }
        });
    }
  }

  public openLogin(): void {
    this.loginModalService().openLogin((<any>this).$root);
  }
}
