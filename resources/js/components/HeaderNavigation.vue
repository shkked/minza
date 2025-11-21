import { useMainTableStore } from '@/stores/mainTable.store.js';
<template>
  <nav>
    <div class="d-flex align-center justify-center">
      <v-tabs>
        <v-tab
          @click="mainTableStore.hierarchyType = 'service_center'"
          density="compact"
          class="text-white"
          >Точка хранения</v-tab
        >
        <v-tab @click="mainTableStore.hierarchyType = 'client'" density="compact" class="text-white"
          >Клиенты</v-tab
        >
      </v-tabs>
    </div>
  </nav>
</template>

<script setup>
import { useMainTableStore } from "@/stores/mainTable.store.js";

const mainTableStore = useMainTableStore();
</script>
