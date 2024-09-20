<template>
  <PageContainer class="home-view" header="Today I need to">
    <TaskForm
      v-model:newTask="newTask"
      placeholder="Add new todo..."
      ariaLabel="Add new todo"
      @submit="store.addTask(newTask.trim())"
    />
    <div class="list-wrapper">
      <DragDropList
        :list="store.tasks"
        :filterFunc="filterQuery !== 'all' ? filterFunc : undefined"
        @update:list="getLastUpdate"
      >
        <template #item="{ item: task }">
          <EditableCheckbox
            v-model:checked="task.done"
            v-model:value="task.body"
            name="tasks"
            @delete="store.deleteTask(task.id)"
            @update:value="store.editTask($event, task.id)"
            @update:modelValue="store.toggleTaskStatus(task.id)"
          />
        </template>
      </DragDropList>
    </div>
    <template v-if="store.tasks.length > 0">
      <TasksDashboard :active="store.totalActive" :done="store.totalDone" />
      <BtnsBar :buttons="buttons" />
    </template>
    <Caption v-else />
    <ToastAlerts />
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'

import PageContainer from '@/layout/page-container/Index.vue'
import TaskForm from '@/components/task-form/Index.vue'
import DragDropList from '@/components/ui/drag-drop-list/Index.vue'
import EditableCheckbox from '@/components/ui/editable-checkbox/Index.vue'
import TasksDashboard from '@/components/tasks-dashboard/Index.vue'
import BtnsBar from '@/components/btns-bar/Index.vue'
import Caption from '@/components/caption/Index.vue'

import ToastAlerts from '@/components/ui/toast-alerts/Index.vue'
import { useAlertStore } from '@/components/ui/toast-alerts/store'

import { type Task } from '@/_config/models'
import { getTasks, updateTasks } from '@/_config/api'
import { useTasksStore } from '@/stores/tasks'

import { debounce } from '@/utils/debounce'

const store = useTasksStore()
const newTask = ref<string>('')

const filterQuery = ref<string>('all')
const lastUpdate = ref<string>()

// computed control buttons

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

// alerts handling

const alertsStore = useAlertStore()

const addAlert = (isSuccess: boolean) => {
  const text = isSuccess ? 'Your todo has beed saved!' : 'Cannot save updates'
  const status = isSuccess ? 'success' : 'danger'

  alertsStore.addAlert(text, status)
}

// filter shown tasks

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

// watching last update for auto save

const getLastUpdate = () => {
  lastUpdate.value = Date.now().toString()
}

store.$onAction((action) => {
  if (action.name === 'updateList') return
  getLastUpdate()
})

const autoSave = debounce(() => {
  updateTasks(store.tasks)
    .then((response) => {
      addAlert(true)
    })
    .catch(() => {
      addAlert(false)
    })
}, 3000)

watch(lastUpdate, (newValue) => {
  autoSave()
})

onBeforeMount(() => {
  getTasks()
})
</script>

<style scoped lang="scss">
.home-view {
  .list-wrapper {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    margin-bottom: auto;

    @media (mix-width: 767px) {
      margin-left: -2rem;
      margin-right: -0.5rem;

      height: 8rem;
      overflow-y: auto;
    }
  }
  .tasks-dashboard {
    @media (mix-width: 767px) {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .caption {
    margin-top: auto;
  }
}
</style>
