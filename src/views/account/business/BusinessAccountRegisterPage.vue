<template lang="">
    <div>
        <business-account-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import BusinessAccountRegisterForm from '@/components/account/business/BusinessAccountRegisterForm.vue';
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
    components: {
        BusinessAccountRegisterForm
    },
    methods: {
        ...mapActions(accountModule, ['requestBusinessRegisterAccountToSpring']),
        async onSubmit(payload) {
            const isSuccess = await this.requestBusinessRegisterAccountToSpring(payload)
            if (isSuccess) {
                this.$router.push("/signin")
            }
        }
    }
}
</script>

<style lang="">
    
</style>