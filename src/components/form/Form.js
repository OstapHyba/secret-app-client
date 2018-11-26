import { required, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'app-form',
  data() {
    return {
      title: 'Secret form',
      isSubmitted: false,
      isError: false,
      errorHeader: 'error.invalidFields',
      errors: [],
      submitting: false,
      linkToSecret: null,
      form: {
        secretText: '',
        expireAfterViews: 1,
        expireAfter: 0
      },
      result: {
        hash: null,
        secretText: null,
        expireAfter: null,
        expireAfterViews: null,
      }
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.sendFormData();
      } else {
        this.validationError();
      }
    },
    enableSubmitLoader() {
      this.submitting = true;
    },
    disableSubmitLoader() {
      this.submitting = false;
    },
    sendFormData() {
      this.enableSubmitLoader();
      axios.post(Vue.config.formApiUrl, this.form).then(response => {
        this.submitSuccess(response);
        this.disableSubmitLoader();
      }).catch(error => {
        this.submitError(error);
        this.disableSubmitLoader();
      });
    },
    submitSuccess(response) {
      if (response.status === 201) {
        this.isSubmitted = true;
        this.isError = false;
        this.linkToSecret = `/${response.data.hash}/`;
        this.result.hash = response.data.hash;
        this.result.secretText = response.data.secretText;
        this.result.expireAfter = response.data.expireAfter;
        this.result.expireAfterViews = response.data.expireAfterViews;
        this.result.createdAt = response.data.createdAt;
      } else {
        this.errorHeader = 'error.invalidFields';
        this.errors = response.data.errors;
        this.isError = true;
      }
    },
    submitError(_error) {
      this.errorHeader = 'error.general';
      this.errors = [{ 'field': null, 'message': 'error.generalMessage' }];
      this.isError = true;
    },
    validationError() {
      this.errorHeader = 'error.invalidFields';
      this.errors = this.getErrors();
      this.isError = true;
    },
    isErrorField(field) {
      try {
        if (this.getValidationField(field).$error) {
          return true;
        }
      } catch (error) { }

      return this.errors.some(el => el.field === field);
    },
    getErrors() {
      let errors = [];
      for (const field of Object.keys(this.form)) {
        try {
          if (this.getValidationField(field).$error) {
            errors.push({ 'field': field, 'message': null });
          }
        } catch (error) { }
      }
      return errors;
    },
    getFieldClasses(field) {
      return { 'is-invalid': this.isErrorField(field) }
    },
    getCharactersLeft(field) {
      try {
        return this.getValidationField(field).$params.maxLength.max - this.form[field].length;
      } catch (error) {
        return 0;
      }
    },
    getValidationField(field) {
      if (this.$v.form[field]) {
        return this.$v.form[field];
      }
      throw Error('No validation for field ' + field);
    },
    onFieldBlur(field) {
      try {
        this.getValidationField(field).$touch();
        if (this.getValidationField(field).$error) {
          if (!this.errors.some(el => el.field === field)) {
            this.errors.push({ 'field': field, 'message': null });
          }
        } else {
          this.errors = this.errors.filter(el => el.field !== field);
        }
      } catch (error) { }
    },
    reload() {
      window.location = '';
    }
  },
  validations: {
    form: {
      secretText: { required, maxLength: maxLength(1024) },
      expireAfterViews: { required },
      expireAfter: { required }
    }
  },
  watch: {
    errors() {
      this.isError = this.errors.length > 0 ? true : false;
    }
  }
}