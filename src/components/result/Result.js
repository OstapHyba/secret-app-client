// import { required } from 'vuelidate/lib/validators';
// import axios from 'axios';
// import Vue from 'vue';

export default {
    name: 'app-result',
    data() {
        return {
            title: 'Your secret here)',
            formPath: '/',
            result: {
                secret: '',
                expireAfterViews: 1,
                expireAfter: 0,
            }
        }
    },
    methods: {
        void() { return null }
    }
}