import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { defineStore } from "pinia";
import router from "@/router";
import { useDatabaseStore } from "@/stores/database";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearError() {
      this.error = null;
    },
    async registerUser(email, password) {
      this.isLoading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async loginUser(email, password) {
      this.isLoading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        return true;
      } catch (error) {
        this.error = error.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
      this.isLoading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.user = null;
        router.push("/login");
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            unsubscribe();
            if (user) {
              this.user = {
                email: user.email,
                uid: user.uid,
              };
            } else {
              this.user = null;
              const databaseStore = useDatabaseStore();
              databaseStore.$reset();
            }
            resolve(this.user);
          },
          (error) => {
            reject(error);
          },
        );
      });
    },
  },
});
