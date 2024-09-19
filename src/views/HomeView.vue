<template>
  <PageContainer header="Today I need to">
    <TaskForm
      v-model:newTask="newTask"
      placeholder="Add new todo..."
      ariaLabel="Add new todo"
      @submit="store.addTask(newTask)"
    />
    <DragDropList :list="store.tasks" :filterFunc="filterQuery !== 'all' ? filterFunc : undefined">
      <template #item="{ item: item }">
        <EditableCheckbox
          v-model:checked="item.done"
          v-model:value="item.body"
          name="tasks"
          @delete="store.deleteTask(item.id)"
          @update:value="store.editTask($event, item.id)"
          @update:modelValue="store.toggleTaskStatus(item.id)"
        />
      </template>
    </DragDropList>
    <TasksDashboard :active="store.totalActive" :done="store.totalDone" />
    <BtnsBar v-if="store.tasks.length > 0" :buttons="buttons" />
    <Caption v-else />
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import PageContainer from '@/layout/page-container/Index.vue'
import TaskForm from '@/components/task-form/Index.vue'
import DragDropList from '@/components/ui/drag-drop-list/Index.vue'
import EditableCheckbox from '@/components/ui/editable-checkbox/Index.vue'
import TasksDashboard from '@/components/tasks-dashboard/Index.vue'
import BtnsBar from '@/components/btns-bar/Index.vue'
import Caption from '@/components/caption/Index.vue'

import { type Task } from '@/_config/models'

import { useTasksStore } from '@/stores/tasks'

const buttons = computed(() => {
  return {
    checkAll: {
      name: 'Check All',
      action: () => {
        store.markAllDone()
      },
      show: true
    },
    showAll: {
      name: 'All',
      action: () => {
        filterQuery.value = 'all'
      },
      show: store.tasks.length > 0,
      selected: filterQuery.value === 'all'
    },
    showActive: {
      name: 'Active',
      action: () => {
        filterQuery.value = 'active'
      },
      show: store.tasks.some((el) => !el.done),
      selected: filterQuery.value === 'active'
    },
    showCompleated: {
      name: 'Completed',
      action: () => {
        filterQuery.value = 'done'
      },
      show: store.tasks.some((el) => el.done),
      selected: filterQuery.value === 'done'
    },
    clearCompleted: {
      name: 'Clear completed',
      action: () => {
        store.clearDone()
        filterQuery.value = 'all'
      },
      show: store.tasks.some((el) => el.done)
    }
  }
})

const store = useTasksStore()
const newTask = ref<string>('')

const filterQuery = ref<string>('all')

const filterFunc = (item: Task): boolean => {
  switch (filterQuery.value) {
    case 'active':
      return !item.done
    case 'done':
      return item.done
    default:
      return true
  }
}
</script>

<style scoped lang="scss"></style>
