<template>
  <div>
    <table>
      <thead>
      <tr>
        <th
        v-for="(header, i) in headers"
        :key="`${header}${i}`"
        :class="i=== 2 ? 'header-item-cell header-item-filter' : 'header-item-cell'"
        @click="toogleFilter"
        >
          <p :class="(i=== 2 && filterCompleted) ? 'header-item-text filter-active' : 'header-item-text'">{{ header }}</p>
        </th>
      </tr>
      </thead>
      <tbody>
        <tr
        v-for="(entity, index) in data"
        :key="`entity-${entity.id}`"
        :class="entity.completed ? 'table-rows-completed' : 'table-rows'"
        >
          <td
          v-for="(header, i) in headers"
          :key="`${header}-${i}`"
          :class="i === 1 ? 'cell-title' : ''"
          >
            <slot :name="`column${i}`" :entity="entity"></slot>
            <div v-if="i === 0">
              <p>{{ index + 1 }}</p>
            </div>
            <div v-if="i === 2">
              <input type="checkbox"
                     class="custom-checkbox"
                     :id="'customCheck' + entity.id"
                     v-model="entity.completed"
                     @change="checkItem(entity)"
              >
            </div>
            <div v-if="i === 3">
              <p @click="deleteItem(entity)">actions</p>
            </div>
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
    data: TodoModel[],
    filterCompleted: boolean | null,
    toogleFilter:() => void,
    deleteItem:(todo:TodoModel) => void,
    checkItem:(todo:TodoModel) => void
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

.header-item-cell {
  padding: 15px;
  background-color: #b8ecda;
}

.header-item-filter {
  cursor: pointer;
}

.header-item-text {
  font-size: 12px;
  text-transform: uppercase;
  padding: 5px;
}

.filter-active {
  background-color: rgb(45, 196, 143);
  border-radius: 8px;
}

.table-rows:nth-child(odd) {
  background-color: rgb(253, 251, 249);
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

.custom-checkbox {
  accent-color: rgb(45, 196, 143);
  cursor: pointer;
}
</style>