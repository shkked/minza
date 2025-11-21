<template>
  <tr v-if="level2Index !== 0">
    <!-- Первая и вторая ячейки в строке пустые (в них отображается первые 2 колонки) -->
    <td></td>
    <td></td>
    <!-- Третья колонка (Модель принтера) -->
    <td>
      <ToggleIcon
        v-if="level2Item[level3ArrayKey].length > 1"
        :expanded="isExpanded(rootNode.value, level1Item.value, level2Item.value)"
        @toggle="toggleExpanded(rootNode.value, level1Item.value, level2Item.value)"
      />
      <span v-if="level2Item[level3ArrayKey].length == 1" class="toggle-icon cursor-default">
        <v-icon small> </v-icon>
      </span>
      {{ level2Item.value }}
    </td>
    <!-- Четвертая колонка (Картридж для строки tr c моделью принтера) -->
    <td
      v-if="
        isExpanded(rootNode.value, level1Item.value, level2Item.value) ||
        level2Item[level3ArrayKey].length === 1
      "
    >
      {{ level2Item[level3ArrayKey][0].value }}
    </td>
    <td v-else></td>
    <!-- Пятая колонка (Количество картриджей для строки tr c моделью принтера) -->
    <td v-if="isExpanded(rootNode.value, level1Item.value, level2Item.value)">
      {{ level2Item[level3ArrayKey][0][countKey] }}
    </td>
    <td v-else>{{ level2Item.total }}</td>
  </tr>

  <template v-if="isExpanded(rootNode.value, level1Item.value, level2Item.value)">
    <template
      v-for="(level3Item, level3Index) in level2Item[level3ArrayKey]"
      :key="`${level3Item}-${level3Index}`"
    >
      <!-- Четвертая колонка (Картридж) -->
      <Level3Row
        :rootNode="rootNode"
        :level1Item="level1Item"
        :level2Item="level2Item"
        :level3Item="level3Item"
        :level3Index="level3Index"
      />
    </template>
  </template>
</template>

<script setup>
import Level3Row from "@/components/rowsTable/Level3Row.vue";
import ToggleIcon from "@/components/ToggleIcon.vue";
import { useMainTableStore } from "@/stores/maintable.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const mainTableStore = useMainTableStore();
const { isExpanded, toggleExpanded } = mainTableStore;
const { currentTableHeadersKeys } = storeToRefs(mainTableStore);

const level3ArrayKey = computed(() => currentTableHeadersKeys.value[3] || "cartridge");
const countKey = computed(() => currentTableHeadersKeys.value[4] || "cartridge_needed");

defineProps({
  rootNode: { type: Object, required: true },
  level1Item: { type: Object, required: true },
  level2Item: { type: Object, required: true },
  level2Index: { type: Number, required: true },
});
</script>
