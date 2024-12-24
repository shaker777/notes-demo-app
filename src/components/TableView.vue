<template>
  <div>
    <table>
      <thead>
      <tr>
        <th
        v-for="(header, i) in headers"
        :key="`${header}${i}`"
        :class="i=== 2 ? 'header-item-cell header-item-filter' : 'header-item-cell'"
        >
          <div v-if="i === 2" :class="filterCompleted ? 'filter-active flexContainer' : 'flexContainer'">
            <router-link :to="filterCompleted ? {name: 'home'} : {name: 'filtered', query: {'completed': 'true'}}" class="flexContainer">
              <p class="header-item-text">{{ header }}</p>
              <font-awesome-icon icon="filter" class="filter-icon"/>
            </router-link>
          </div>
          <p class="header-item-text" v-else>{{ header }}</p>
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
            <div v-if="i === 3" class="buttonsContainer">
              <IconButton icon="pencil"
                          :dark="true"
                          @click="editItem(entity.id)"
              class="action-button"/>
              <IconButton icon="trash"
                          :dark="true"
                          @click="deleteItem(entity.id)"/>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import {TodoModel} from "@/model/todo-model";
  import IconButton from "./IconButton.vue"

  defineProps<{
    headers: string[],
    data: TodoModel[],
    filterCompleted: boolean | null,
    deleteItem:(todoId:number) => void,
    editItem:(todoId:number) => void,
    checkItem:(todo:TodoModel) => void
  }>()

</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100vw;
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
  padding: 12px;
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
  z-index: 10;
}

.buttonsContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
}
.action-button {
  margin-right: 10px;
}

.flexContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.filter-icon {
  font-size: 10px;
}

</style>