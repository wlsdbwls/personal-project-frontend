<template lang="">
    <div>
        <normal-account-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import NormalAccountRegisterForm from '@/components/account/normal/NormalAccountRegisterForm.vue';
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
    components: {
        NormalAccountRegisterForm
    },
    methods: {
        ...mapActions(accountModule, ['requestNormalRegisterAccountToSpring']),
        async onSubmit(payload) {
            const isSuccess = await this.requestNormalRegisterAccountToSpring(payload)
            if (isSuccess) {
                this.$router.push("/signin")
            }
        }
    }
}
</script>

<style lang="">
    
</style>