<template>
  <HeaderView title="Мои заметки" :show-add-note-modal="handleShowAddModal"/>
  <RouterView />
  <FooterView v-if="showFooter" :title="title"/>
  <ActionModal  v-if="showAddModal === true"
                title="Создать заметку"
                action-title="Создать"
                :on-action="handleAction"
                :on-close="handleCloseAddModal"/>
</template>

<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import useSettings from '@/hooks/useSettings'
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import ActionModal from "@/components/ActionModal.vue";
import ActionMode from "@/types/enum"
import {ref, watch} from "vue";
import useTodos from "@/hooks/useTodos";

const route = useRoute();

const { showFooter, actionMode, setActionMode } = useSettings();
const { addTodo, valid } = useTodos()

const title:string = `Vue Notes SPA ${__APP_VERSION__} Новогоднее издание`

const showAddModal = ref<boolean>(false)

function handleShowAddModal () {
  setActionMode(ActionMode.Create)
  showAddModal.value = true
}

function handleCloseAddModal() {
  showAddModal.value = false
}

function handleAction() {
  if (actionMode.value === ActionMode.Create && valid.value === true) {
    addTodo()
    showAddModal.value = false
  }
}

watch(
() => route.fullPath,
async () => {
  if (route.fullPath.includes('/add')) {
    handleShowAddModal()
  } else {
    showAddModal.value = false
  }
}
);

</script>

<style scoped>

</style>
