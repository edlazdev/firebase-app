<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
</script>
<template>
  <h1>Home View - {{ user?.email }}</h1>
</template>