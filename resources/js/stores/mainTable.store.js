import { api } from "@/axios";
import { makeKey } from "@/utils/makeKey.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMainTableStore = defineStore("maintable", () => {
  const isLoading = ref(false);
  const hierarchyType = ref("service_center");

  // Массив уникальных значений для хранения раскрытых строк
  const expandedSet = ref(new Set());

  // Элементы для v-select клиента
  const clientsItems = ref([]);

  // Фильтры
  const filtersData = ref({
    selectedClient: [],
  });
  // Данные для таблицы
  const tableData = ref([]);

  // Заголовки таблицы
  const tableHeaders = ref({
    service_center: [
      {
        title: "Точка хранения",
        key: "service_center",
        width: "150",
      },
      {
        title: "Регион",
        key: "area",
        width: "270",
      },
      {
        title: "Модель принтера",
        key: "printer_model",
        width: "200",
      },
      {
        title: "Картридж",
        key: "cartridge",
        width: "140",
      },
      {
        title: "Кол-во картриджей",
        key: "cartridge_needed",
        width: "150",
      },
    ],
    client: [
      {
        title: "Клиент",
        key: "client",
        width: "200",
      },
      {
        title: "Точка хранения",
        key: "service_center",
        width: "150",
      },
      {
        title: "Модель принтера",
        key: "printer_model",
        width: "200",
      },
      {
        title: "Картридж",
        key: "cartridge",
        width: "140",
      },
      {
        title: "Кол-во картриджей",
        key: "cartridge_needed",
        width: "150",
      },
    ],
  });

  const currentTableHeaders = computed(() => tableHeaders.value[hierarchyType.value]);
  const currentTableHeadersKeys = computed(() => currentTableHeaders.value.map((item) => item.key));
  // Скрытие/раскрытие строк в таблице
  const toggleExpanded = (...parts) => {
    const key = makeKey(...parts);
    if (expandedSet.value.has(key)) expandedSet.value.delete(key);
    else expandedSet.value.add(key);
  };
  // Проверка, раскрыта ли строка
  const isExpanded = (...parts) => {
    return expandedSet.value.has(makeKey(...parts));
  };
  // Закрыть все раскрытые строки
  const closeAllIsExpanded = () => {
    expandedSet.value.clear();
  };
  const clearAllFilters = () => {
    filtersData.value.selectedClient = [];
  };
  // Получение данных для таблицы
  const fetchTableData = async () => {
    try {
      isLoading.value = true;
      const response = await api.get("/minza", {
        params: {
          hierarchy_type: hierarchyType.value,
          filters: {
            client: filtersData.value.selectedClient,
          },
        },
      });
      tableData.value = response.data.assets_detailed;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  const getClientsItems = async () => {
    try {
      const response = await api.get("/minza/clients");
      clientsItems.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tableData,
    tableHeaders,
    fetchTableData,
    closeAllIsExpanded,
    isLoading,
    toggleExpanded,
    isExpanded,
    expandedSet,
    clientsItems,
    getClientsItems,
    filtersData,
    hierarchyType,
    clearAllFilters,
    currentTableHeaders,
    currentTableHeadersKeys,
  };
});
