<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Please fill in all fields");
    return;
  }
  const success = await userStore.loginUser(email.value, password.value);
  if (success) {
    router.push("/");
  }
};
</script>
<template>
  <h1>Login View</h1>
  <form @submit.prevent="handleLogin">
    <input type="email" v-model="email" required placeholder="Email" />
    <input type="password" v-model="password" required placeholder="Password" />
    <p v-if="userStore.error" style="color: red;">{{ userStore.error }}</p>
    <button type="submit" :disabled="userStore.isLoading">
      {{ userStore.isLoading ? "Loading..." : "Login" }}
    </button>
  </form>
</template>
