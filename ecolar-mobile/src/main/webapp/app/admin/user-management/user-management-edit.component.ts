import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import { Component, Inject, Vue } from 'vue-property-decorator';
import UserManagementService from './user-management.service';

function loginValidator(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true;
    }
    return /^[_.@A-Za-z0-9-]*$/.test(value);
}

const validations: any = {
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
};

const beforeRouteEnter = (to, from, next) => {
    next(vm => {
        if (to.params.userId) {
            vm.init(to.params.userId);
        }
    });
};

@Component({
    validations,
    beforeRouteEnter
})
export default class EcoUserManagementEdit extends Vue {
    @Inject('userService') private userManagementService: () => UserManagementService;
    public userAccount: any;
    public isSaving: boolean;
    private authorities: any[];
    public languages: any;

    public constructor() {
        super();
        this.userAccount = {
            id: null,
            login: null,
            firstName: null,
            lastName: null,
            email: null,
            authorities: [],
            langKey: null
        };
        this.isSaving = false;
        this.authorities = [];
        this.languages = this.$store.getters.languages;
    }

    public init(userId: number): void {
        this.userManagementService()
            .get(userId)
            .then(res => {
                this.userAccount = res.data;
                this.userManagementService()
                    .retrieveAuthorities()
                    .then(res => {
                        this.authorities = res.data;
                    });
            });
    }

    public previousState(): void {
        (<any>this).$router.go(-1);
    }

    public save(): void {
        this.isSaving = true;
        if (this.userAccount.id) {
            this.userManagementService()
                .update(this.userAccount)
                .then(() => this.returnToList());
        } else {
            this.userManagementService()
                .create(this.userAccount)
                .then(() => this.returnToList());
        }
    }

    private returnToList(): void {
        this.isSaving = false;
        (<any>this).$router.go(-1);
    }
}
