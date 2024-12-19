<template>
    <div :class="dark ? 'button dark' : 'button border light'">
      <font-awesome-icon :icon="icon" class="icon"/>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string,
  dark: boolean
}>()
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-style: solid;
  border-width: thin;
  border-radius: 50%;
}

.button:hover {
  opacity: 75%;
}

.dark {
  color: #3a6c56;
}
.light {
  color: white;
}

.icon {
  margin: auto;
  width: 50%;
  height: 50%;
}
</style>