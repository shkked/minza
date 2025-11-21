<template>
  <div>
    <div class="d-flex align-end justify-space-between mb-5">
      <div class="d-flex flex-column">
        <p>Клиент</p>
        <v-select
          v-model="filtersData.selectedClient"
          label="Выберите клиента"
          class="mt-2"
          :items="mainTableStore.clientsItems"
          density="compact"
          multiple
          clearable
          hide-details
          variant="outlined"
          min-width="200px"
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-title>Нет данных</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <v-btn color="primary" @click="mainTableStore.closeAllIsExpanded"> Свернуть все </v-btn>
    </div>
    <v-sheet border rounded>
      <v-table density="compact" fixed-header>
        <thead>
          <tr>
            <th
              v-for="col in currentTableHeaders"
              :key="col.key"
              class="font-weight-bold text-center"
              :width="col.width"
            >
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody v-if="mainTableStore.isLoading">
          <tr>
            <td colspan="5" class="text-center py-10">
              <v-progress-circular indeterminate color="primary" />
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="mainTableStore.tableData.length === 0">
          <tr>
            <td colspan="5" class="text-center py-10">Нет данных</td>
          </tr>
        </tbody>
        <tbody v-else>
          <RowRenderer
            v-for="(item, idx) in mainTableStore.tableData"
            :key="`row-${idx}`"
            :rootNode="item"
          />
        </tbody>
      </v-table>
    </v-sheet>
  </div>
</template>

<script setup>
import RowRenderer from "@/components/RowRenderer.vue";
import { useMainTableStore } from "@/stores/mainTable.store.js";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";

const mainTableStore = useMainTableStore();
const { filtersData, hierarchyType, currentTableHeaders } = storeToRefs(mainTableStore);

// Наблюдение за изменениями фильтров
watch(
  () => filtersData.value,
  () => {
    mainTableStore.fetchTableData();
  },
  { deep: true }
);

watch(
  () => hierarchyType.value,
  async () => {
    mainTableStore.closeAllIsExpanded();
    mainTableStore.clearAllFilters();
    await mainTableStore.getClientsItems();
    mainTableStore.fetchTableData();
  }
);
// Получение данных таблицы при монтировании компонента
onMounted(async () => {
  await mainTableStore.getClientsItems();
  mainTableStore.fetchTableData();
});
</script>

<style lang="scss">
.v-table {
  max-height: 600px;
  td,
  th,
  span {
    font-size: 13px;
  }
  thead tr th:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }

  td:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
  tr td:last-child {
    text-align: center;
  }
}
</style>
