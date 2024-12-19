<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import useSettings from '@/hooks/useSettings'
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";

const { showFooter } = useSettings();
const title:string = `Vue Notes SPA ${__APP_VERSION__} Новогоднее издание`

function handleShowAddNoteModal () {
  console.log('handleShowAddNoteModal')
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

<template>
  <HeaderView title="Мои заметки" :show-add-note-modal="handleShowAddNoteModal"/>
  <RouterView />
  <FooterView v-if="showFooter" :title="title"/>
</template>

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
</style>
