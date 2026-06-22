<script setup>
import { ref, onMounted } from "vue";
import { useDatabaseStore } from "@/stores/database";
import { useRoute } from "vue-router";

const route = useRoute();
const databaseStore = useDatabaseStore();

const url = ref("");

const handleSubmit = async () => {
  await databaseStore.updateUrl(route.params.id, url.value);
};

onMounted(async () => {
  url.value = await databaseStore.readDoc(route.params.id);
});
</script>

<template>
  <h1>Editar</h1>
  <p v-if="databaseStore.loadingDoc">Loading doc...</p>
  <form @submit.prevent="handleSubmit" v-else>
    <input type="text" placeholder="url" v-model.trimp="url" />
    <button type="submit" :disabled="databaseStore.loadingDoc">Editar</button>
  </form>
</template>
