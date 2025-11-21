<template>
  <v-app>
    <HeaderLayout />
    <v-container fluid max-width="1600">
      <router-view />
    </v-container>
  </v-app>
</template>

<script setup>
import HeaderLayout from "@/components/HeaderLayout.vue";
</script>
