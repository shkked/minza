<template>
  <tr v-if="level3Index !== 0">
    <!-- Первая, вторая, третья ячейки в строке пустые (в них отображается первые 3 колонки) -->
    <td></td>
    <td></td>
    <td></td>
    <!-- Четвертая колонка (Картридж) -->
    <td
      v-if="
        isExpanded(rootNode.value, level1Item.value, level2Item.value) ||
        level2Item[level3ArrayKey].length === 1
      "
    >
      <span v-if="level2Item[level3ArrayKey].length == 1" class="toggle-icon cursor-default">
        <v-icon small> </v-icon>
      </span>
      {{ level3Item.value }}
    </td>
    <!-- Пятая колонка (Количество картриджей) -->
    <td v-else></td>
    <td>{{ level3Item[countKey] }}</td>
  </tr>
</template>

<script setup>
import { useMainTableStore } from "@/stores/maintable.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineProps({
  rootNode: { type: Object, required: true },
  level1Item: { type: Object, required: true },
  level2Item: { type: Object, required: true },
  level3Item: { type: Object, required: true },
  level3Index: { type: Number, required: true },
});
const mainTableStore = useMainTableStore();
const { isExpanded } = mainTableStore;
const { currentTableHeadersKeys } = storeToRefs(mainTableStore);

const level3ArrayKey = computed(() => currentTableHeadersKeys.value[3]);
const countKey = computed(() => currentTableHeadersKeys.value[4]);
</script>
