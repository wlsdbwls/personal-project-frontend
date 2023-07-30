<template lang="">
    <div>
        <template v-if="account">
            <account-modify-form :account="account"/>
        </template>
    </div>
</template>

<script>
import AccountModifyForm from "@/components/account/AccountModifyForm.vue"
import { mapActions, mapState } from "vuex";

const accountModule = 'accountModule'

export default {
    name: "AccountModifyPage",
    components: {
        AccountModifyForm,
    },
    methods: {
        ...mapActions(accountModule, ['requestModifyAccountToSpring', 'requestAccountToSpring']),
    },
    computed: {
        ...mapState(accountModule, ["account"]),
    },

    async created() {
        this.userToken = localStorage.getItem("userToken")
        await this.requestAccountToSpring({ userToken: this.userToken });
    }
}

</script>

<style lang="">
    
</style>