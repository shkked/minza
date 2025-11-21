<template>
  <tr v-if="level1Index == 0 || isExpanded(rootNode.value)">
    <!-- Первая колонка (В разных вариантах отображаются точка хранения, клиент и т.д.) -->
    <td v-if="level1Index === 0">
      <ToggleIcon :expanded="isExpanded(rootNode.value)" @toggle="toggleExpanded(rootNode.value)" />
      {{ rootNode.value }}
    </td>
    <td v-else></td>

    <!-- Вторая колонка (В разных вариантах отображаются регион, точка хранения и т.д.) -->
    <td v-if="isExpanded(rootNode.value)">
      <ToggleIcon
        :expanded="isExpanded(rootNode.value, level1Item.value)"
        @toggle="toggleExpanded(rootNode.value, level1Item.value)"
      />
      {{ level1Item.value }}
    </td>
    <td v-else></td>

    <!-- Третья колонка (Модель принтера для первой строки tr) -->
    <td v-if="isExpanded(rootNode.value) && isExpanded(rootNode.value, level1Item.value)">
      <ToggleIcon
        v-if="item0[level3ArrayKey].length > 1"
        :expanded="isExpanded(rootNode.value, level1Item.value, item0.value)"
        @toggle="toggleExpanded(rootNode.value, level1Item.value, item0.value)"
      />
      <span v-else class="toggle-icon cursor-default">
        <v-icon small> </v-icon>
      </span>
      {{ item0.value }}
    </td>
    <td v-else></td>

    <!-- Четвертая колонка ( Картридж для первой строки tr). Отображается, если раскрыты первые 3 колонки, или, если у второй колонки только 1 элемент из 3 колонки и раскрыты первые 2 колонки -->
    <td
      v-if="
        (isExpanded(rootNode.value) &&
          isExpanded(rootNode.value, level1Item.value) &&
          isExpanded(rootNode.value, level1Item.value, item0.value)) ||
        (isExpanded(rootNode.value) &&
          isExpanded(rootNode.value, level1Item.value) &&
          item0[level3ArrayKey].length === 1)
      "
    >
      {{ count0.value }}
    </td>
    <td v-else></td>

    <!-- Последняя колонка (для первой строки tr) -->
    <td
      v-if="
        isExpanded(rootNode.value) &&
        isExpanded(rootNode.value, level1Item.value) &&
        isExpanded(rootNode.value, level1Item.value, item0.value)
      "
    >
      {{ count0[countKey] }}
    </td>
    <td v-else-if="isExpanded(rootNode.value) && isExpanded(rootNode.value, level1Item.value)">
      {{ item0.total }}
    </td>
    <td v-else-if="isExpanded(rootNode.value)">
      {{ level1Item.total }}
    </td>
    <td v-else>
      {{ rootNode.total }}
    </td>
  </tr>
</template>

<script setup>
import ToggleIcon from "@/components/ToggleIcon.vue";
import { useMainTableStore } from "@/stores/maintable.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { rootNode, level1Item, level1Index } = defineProps({
  rootNode: { type: Object, required: true },
  level1Item: { type: Object, required: true },
  level1Index: { type: Number, required: true },
});

const mainTableStore = useMainTableStore();
const { isExpanded, toggleExpanded } = mainTableStore;
const { currentTableHeadersKeys } = storeToRefs(mainTableStore);

const level2ArrayKey = computed(() => currentTableHeadersKeys.value[2] || "printer_model");
const level3ArrayKey = computed(() => currentTableHeadersKeys.value[3] || "cartridge");
const countKey = computed(() => currentTableHeadersKeys.value[4] || "cartridge_needed");
const item0 =
  level1Item[level2ArrayKey.value] && level1Item[level2ArrayKey.value][0]
    ? level1Item[level2ArrayKey.value][0]
    : { value: "", [level3ArrayKey.value]: [{ value: "", [countKey.value]: "" }], total: "" };
const count0 =
  item0[level3ArrayKey.value] && item0[level3ArrayKey.value][0]
    ? item0[level3ArrayKey.value][0]
    : { value: "", [countKey.value]: "" };
</script>

<style scoped>
.toggle-icon {
  cursor: pointer;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
