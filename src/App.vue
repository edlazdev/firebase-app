<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue';

const userStore = useUserStore();

const { logoutUser } = userStore;

const isLoggedIn = computed(() => userStore.isLoggedIn);
</script>

<template>
  <h1>App Base</h1>
  <nav>
    <router-link v-if="isLoggedIn" to="/">Home</router-link> 
    <router-link v-if="!isLoggedIn" to="/login">Login </router-link> 
    <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
    <button v-if="isLoggedIn" @click="logoutUser">Logout</button>

  </nav>
  <router-view />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: red;
}

</style>
