<template>
  <p :class="destructive === undefined ? 'button base' : (destructive ? 'button destructive' : 'button done')">
    {{ title }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  destructive?: boolean | undefined,
}>()
</script>

<style scoped lang="scss">
.button {
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
  color: black;
  background-color: rgba(128, 128, 128, 0.3);
}

.done {
  color: white;
  background-color: $primary-color;
}
.destructive {
  color: white;
  background-color: $red-color;
}
</style>