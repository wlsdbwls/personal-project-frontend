<template>
  <div id="app">
    <navigation-menu-page />
    <div class="container">
      <div class="contents">
        <main>
          <router-view id="router-view" />
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import NavigationMenuPage from './views/layout/NavigationMenuPage.vue'
import Footer from './views/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    NavigationMenuPage,
    Footer,
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
  margin-top: 20px;
}

footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
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

