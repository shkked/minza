<template>
  <span @click="$emit('toggle')" class="toggle-icon">
    <v-icon small>
      {{ expanded ? "mdi-chevron-down" : "mdi-chevron-right" }}
    </v-icon>
  </span>
</template>

<script setup>
defineProps({
  expanded: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.toggle-icon {
  cursor: pointer;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
