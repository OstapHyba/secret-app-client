import axios from 'axios';
import Vue from 'vue';

export default {
    name: 'app-result',
    data() {
        return {
            title: 'Your secret here)',
            isReady: false,
            formPath: '/',
            result: {
                secret: '-',
                expireAfterViews: '-',
                expireAfter: '-',
                createdAt: '-'
            },
            hash: null
        }
    },
    methods: {
        goTo(path) {
            this.$router.push(`/${path}/`)
        },
        getData() {
            let hash = this.$route.params.hash
            axios.get(Vue.config.formApiUrl + hash).then(response => {
                this.submitSuccess(response);
            }).catch(error => {
                if (error.response.status === 404)
                    this.goTo('not-found')
                if (error.response.status === 500)
                    this.goTo('server-error')
            });
        },
        submitSuccess(response) {
            if (response.status === 200) {
                this.isReady = true;
                this.result.secret = response.data.secretText;
                this.result.expireAfter = response.data.expireAfter;
                this.result.expireAfterViews = response.data.expireAfterViews;
                this.result.createdAt = response.data.createdAt;
            }
        },
    },
    created: function () {
        this.getData()
    }
}