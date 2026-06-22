<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDatabaseStore } from '@/stores/database'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const databaseStore = useDatabaseStore()

const { user } = storeToRefs(userStore)
const { getUrls, addUrl, deleteUrl } = databaseStore
const { documents, isLoading } = storeToRefs(databaseStore)

const url = ref("")

onMounted(() => {
  getUrls()
})
</script>
<template>
  <h1>Home View - {{ user?.email }}</h1>
  <form @submit.prevent="addUrl(url)">
    <input type="text" v-model="url" required placeholder="URL" />
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? "Adding..." : "Add URL" }}
    </button>
  </form>
  <p v-if="isLoading">Loading docs...</p>
  <ul v-else>
    <li v-for="document in documents" :key="document.id">
      <!-- <a :href="document.shortUrl" target="_blank">{{ document.shortUrl }}</a> -->
      <span>{{ document.id }}</span> <br>
      <span>{{ document.name }}</span> <br>
      <span>{{ document.short }}</span> <br>
      <button @click="deleteUrl(document.id)" :disabled="isLoading">Delete</button>
      <button @click="router.push(`/edit/${document.id}`)" :disabled="isLoading">Edit</button>
    </li>
  </ul>
</template>