<template>
  <div>
    <table>
      <thead>
      <tr>
        <th
        v-for="(header, i) in headers"
        :key="`${header}${i}`"
        class="header-item"
        >
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
      v-for="entity in data"
      :key="`entity-${entity.title}`"
      :class="entity.completed ? 'table-rows' : 'table-rows-completed'"
      >
        <td
        v-for="(header, i) in headers"
        :key="`${header}-${i}`"
        >
          <slot :name="`column${i}`" :entity="entity"></slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import {TodoModel} from "@/model/todo-model";

  defineProps<{
    headers: string[],
    data: TodoModel[]
  }>()
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
  word-wrap: break-word;
}

table>thead>tr>th {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;
}

td {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid rgb(224, 242, 237);
}

.cell-title {
  text-align: left;
}

.header-item {
  padding: 30px 20px;
  font-size: 12px;
  background-color: #b8ecda;
  text-transform: uppercase;
}

.table-rows:nth-child(odd) {
  background-color: rgb(250, 250, 250);
}

.table-rows-completed {
  background-color: rgb(224, 242, 237);
}

.table-rows-completed:hover {
  opacity: 0.75;
}

.table-rows:nth-child(n):hover {
  opacity: 0.75;
}
</style>