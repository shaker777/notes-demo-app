<template>
  <HeaderView title="Мои заметки" :show-add-note-modal="handleShowAddModal"/>
  <RouterView />
  <FooterView v-if="showFooter" :title="title"/>
  <ActionModal  v-if="showAddModal === true"
                title="Создать заметку"
                action-title="Создать"
                :destructive="false"
                :on-action="onCreate"
                :on-cancel="handleCloseAddModal">
    <template #content>
      <textarea v-model="newTodoTitle" class="text-area"/>
      <div class="custom-checkbox-container">
        <input type="checkbox"
              class="custom-checkbox"
              id="completeCheck"
              v-model="newTodoCompleted"
        >
        <label class="custom-checkbox-label" for="completeCheck">Сделано</label>
      </div>
    </template>
  </ActionModal>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import useSettings from '@/hooks/useSettings'
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import ActionModal from "@/components/ActionModal.vue";
import {ref} from "vue";
import useTodos from "@/hooks/useTodos";

const { showFooter } = useSettings();
const { addTodo, newTodoTitle, newTodoCompleted } = useTodos()

const title:string = `Vue Notes SPA ${__APP_VERSION__} Новогоднее издание`

const showAddModal = ref<boolean>(false)

function handleShowAddModal () {
  showAddModal.value = true
}

function handleCloseAddModal() {
  showAddModal.value = false
}

function onCreate() {
  addTodo()
  showAddModal.value = false
}

</script>
<!--
<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/About">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
-->

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}



.text-area {
  min-height: 100px;
  margin: auto;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 1rem;
  resize: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-style: solid;
  border-color: #3a6c56;
  border-radius: 8px;
  padding: 0.5rem;
}

.custom-checkbox-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 15px;
  margin-top: 10px;
}

.custom-checkbox {
  accent-color: rgb(45, 196, 143);
  cursor: pointer;
}

.custom-checkbox-label {
  margin-left: 10px;
}
</style>
