import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ValidationMixin extends Vue {
    errorMessage (fieldName: string) {
        const field = this.nestedField(this.$v, fieldName);
        const errors = [];
        if (!field.$dirty) {
            return errors;
        }
        for (const key in field.$params) {
            const constrainType = field.$params[key].type;
            if(!field[constrainType]) {
                errors.push(this.$t('entity.validation.' + constrainType.toLowerCase(), field.$params[constrainType]));
            }
        }
        return errors
    }

    nestedField(field: any, path: string) {
        let paths: string[] = path.split('.');
        let property = paths.shift();
        let nesteField = field[property];
        if(paths.length == 0) {
            return nesteField;
        } else {
            return this.nestedField(nesteField, paths.join('.'));
        }
    }
}