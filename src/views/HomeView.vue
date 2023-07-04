<template>
  <v-container>
    <div>
      <nav>
        <router-link to="/select-account-type">회원 유형 선택</router-link> |
      </nav>
    </div>
  </v-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',

  components: {
    HelloWorld,
  },
}
</script>
