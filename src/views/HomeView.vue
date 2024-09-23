<template>
  <PageContainer class="home-view" header="Today I need to">
    <TaskForm
      v-model:newTask="newTask"
      placeholder="Add new todo..."
      ariaLabel="Add new todo"
      @submit="submitTask"
    />
    <div class="list-wrapper">
      <DragDropList
        :list="store.tasks"
        :filterFunc="filterQuery !== 'all' ? filterFunc : undefined"
        @replace="replaceTasks"
      >
        <template #item="{ item: task }">
          <EditableCheckbox
            v-model:checked="task.done"
            v-model:value="task.body"
            name="tasks"
            @delete="deleteTask(task.id)"
            @update:value="editTask(task.id, $event)"
            @update:checked="toggleTaskStatus(task.id, $event)"
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
import { computed, onBeforeMount, ref } from 'vue'

import PageContainer from '@/layout/page-container/Index.vue'
import TaskForm from '@/components/task-form/Index.vue'
import DragDropList from '@/components/ui/drag-drop-list/Index.vue'
import EditableCheckbox from '@/components/ui/editable-checkbox/Index.vue'
import TasksDashboard from '@/components/tasks-dashboard/Index.vue'
import BtnsBar from '@/components/btns-bar/Index.vue'
import Caption from '@/components/caption/Index.vue'

import ToastAlerts from '@/components/ui/toast-alerts/Index.vue'

import { type Task } from '@/_config/models'
import { useTasksStore } from '@/stores/tasks'
import { useAlertStore } from '@/components/ui/toast-alerts/store'

const store = useTasksStore()
const newTask = ref<string>('')

const filterQuery = ref<string>('all')

// computed control buttons
const buttons = computed(() => {
  return {
    checkAll: {
      name: 'Check All',
      action: () => markAllDone(),
      show: store.tasks.length > 0
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
      action: () => clearDone(),
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

// check connection to show alerts if changes cannot be saved

const checkConnection = () => {
  if (!navigator.onLine) {
    addAlert(false)
  }
}

const markAllDone = () => {
  checkConnection()

  store
    .markAllDone()
    .then(() => {
      addAlert(true)
      filterQuery.value = 'all'
    })
    .catch(() => {
      addAlert(false)
    })
}

const clearDone = () => {
  checkConnection()
  store
    .clearDone()
    .then(() => {
      addAlert(true)
      filterQuery.value = 'all'
    })
    .catch(() => {
      addAlert(false)
    })
}

const submitTask = (taskBody: string) => {
  checkConnection()
  store
    .addTask(taskBody)
    .then(() => {
      addAlert(true)
    })
    .catch(() => {
      addAlert(false)
    })
}

const deleteTask = (id: string) => {
  checkConnection()
  store
    .deleteTask(id)
    .then(() => {
      addAlert(true)
    })
    .catch(() => {
      addAlert(false)
    })
}
const editTask = (id: string, body: string) => {
  checkConnection()
  store
    .updateTask(id, { body })
    .then(() => {
      addAlert(true)
    })
    .catch(() => {
      addAlert(false)
    })
}
const toggleTaskStatus = (id: string, done: boolean) => {
  checkConnection()
  store
    .updateTask(id, { done })
    .then(() => {
      addAlert(true)
    })
    .catch(() => {
      addAlert(false)
    })
}

const replaceTasks = (oldIndex: number, newIndex: number, prevList: Task[]) => {
  checkConnection()
  store
    .replace(oldIndex, newIndex, prevList)
    .then(() => {
      addAlert(true)
    })
    .catch(() => {
      addAlert(false)
      store.tasks = [...prevList]
    })
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

onBeforeMount(() => {
  store.fetchTasks()
})
</script>

<style scoped lang="scss">
.home-view {
  .list-wrapper {
    margin: 1rem -0.5rem auto -0.5rem;

    @media (min-width: 768px) {
      margin-left: -2rem;
      margin-right: -0.5rem;

      max-height: 10rem;
      overflow-y: auto;
    }

    &::-webkit-scrollbar {
      width: 0.5em;
    }

    &::-webkit-scrollbar-track {
      background: var(--bg-gradient);
      border-radius: 0.25rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--text-transparent);
      border-radius: 0.25rem;
    }
  }
  .tasks-dashboard {
    @media (mix-width: 768px) {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .caption {
    margin-top: auto;
  }
}
</style>
