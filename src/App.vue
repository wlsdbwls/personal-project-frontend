<template>
  <div id="app">
    <div class="container">
      <navigation-menu-page />
      <div class="contents">
        <!-- <Section />          -->
        <router-view id="router-view" />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>

import NavigationMenuPage from './views/layout/NavigationMenuPage.vue'
import Footer from './views/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    NavigationMenuPage,
    Footer
  }
}
</script>

<style lang="css">
@import './assets/css/common.css';

.container {
  position: relative;
  min-height: 100vh;
}

.contents {
  padding-bottom: 150px;
}

footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background-color: #f2f2f2;
}

.wrap {
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 200px;
  display: flex;
  justify-content: space-between;
}

.main {
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 200px;
  display: flex;
  justify-content: space-between;
}

.main_leftaside {
  width: 200px;
}

.main_contents {
  /* width: 820px; */
}
</style>

