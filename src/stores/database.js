import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { db, auth } from "@/firebaseConfig";
import router from "@/router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    isLoading: false,
  }),
  actions: {
    async getUrls() {
      this.isLoading = true;
      this.documents = [];
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid),
        );
        const querySnapshot = await getDocs(q);
        this.documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async addUrl(name) {
      this.isLoading = true;
      try {
        const docObject = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), docObject);
        this.documents.push({
          id: docRef.id,
          ...docObject,
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUrl(id) {
      this.isLoading = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Document not found");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("You are not the owner of this document");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter(
          (document) => document.id !== id,
        );
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateUrl(id, name) {
      this.isLoading = true;
      try {
        const docRef = doc(db, "urls", id);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Document not found");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("You are not the owner of this document");
        }

        await updateDoc(docRef, { name: name });
        this.documents = this.documents.map((document) =>
          document.id === id ? { ...document, name: name } : document,
        );
        router.push("/");
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async readDoc(id) {
      this.isLoading = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("Document not found");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("You are not the owner of this document");
        }

        return docSnap.data().name;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
