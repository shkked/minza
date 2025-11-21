<template>
  <template
    v-for="(level1Item, level1Index) in rootNode[level1ArrayKey]"
    :key="`${level1ArrayKey}-${level1Index}`"
  >
    <!-- Первые две колонки -->
    <Level1Row :rootNode="rootNode" :level1Item="level1Item" :level1Index="level1Index" />

    <template v-if="isExpanded(rootNode.value) && isExpanded(rootNode.value, level1Item.value)">
      <template
        v-for="(level2Item, level2Index) in level1Item[level2ArrayKey]"
        :key="`${level2ArrayKey}-${level2Index}`"
      >
        <!-- Остальные колонки -->
        <Level2Row
          :rootNode="rootNode"
          :level1Item="level1Item"
          :level2Item="level2Item"
          :level2Index="level2Index"
        />
      </template>
    </template>
  </template>
</template>

<script setup>
import Level1Row from "@/components/rowsTable/Level1Row.vue";
import Level2Row from "@/components/rowsTable/Level2Row.vue";
import { useMainTableStore } from "@/stores/maintable.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineProps({
  rootNode: {
    type: Object,
    required: true,
  },
});

const mainTableStore = useMainTableStore();
const { isExpanded } = mainTableStore;
const { currentTableHeadersKeys } = storeToRefs(mainTableStore);

const level1ArrayKey = computed(() => currentTableHeadersKeys.value[1]);
const level2ArrayKey = computed(() => currentTableHeadersKeys.value[2]);
</script>
