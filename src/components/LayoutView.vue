<template>
  <HeaderView title="Мои заметки"/>
  <slot name="main"/>
  <FooterView title="Vue SPA"/>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";

export default {
  name: 'LayoutView',
  components: {
    FooterView,
    HeaderView
  }
}
</script>

<style scoped>

</style>