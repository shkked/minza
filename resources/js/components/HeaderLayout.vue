<template>
  <header class="header">
    <v-container lass="d-flex align-center pb-0 justify-space-between" fluid max-width="1600">
      <v-spacer></v-spacer>
      <h1 class="h1 text-center text-uppercase text-white">ЛантаСервис Минза</h1>
      <v-spacer></v-spacer>
    </v-container>

    <HeaderNavigation />
  </header>
</template>

<script setup>
import HeaderNavigation from "./HeaderNavigation.vue";
</script>

<style lang="scss" scoped>
.header {
  background-color: #0d50b8;
}
</style>
