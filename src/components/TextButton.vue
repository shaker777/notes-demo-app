<template>
  <p :class="destructive ? 'button destructive' : 'button base'">
    {{ title }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  destructive: boolean,
}>()
</script>

<style scoped>
.button {
  color: white;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  outline: unset;
}

.base {
  background-color: rgb(45, 196, 143);
}
.destructive {
  background-color: rgb(180 17 17);
}
</style>