<template>
  <VueDraggable
    class="drag-drop-list"
    v-model="list"
    tag="ul"
    :animation="150"
    ghost-class="ghost"
    direction="vertical"
    handle=".handle"
    @start="updateCopy"
    @end="onChange($event)"
  >
    <li v-for="(item, i) in list" :key="i" v-show="filterFunc ? filterFunc(item) : true">
      <DragDropIcon class="drag-icon handle" width="16" height="16" aria-hidden="true" />
      <slot name="item" :item="item" :index="i" />
    </li>
  </VueDraggable>
</template>

<script setup lang="ts">
import DragDropIcon from '@/assets/icons/drag-drop.svg'
import { ref } from 'vue'
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus'

const props = defineProps<{
  filterFunc?: (item: any) => boolean
}>()

const list = defineModel<any[]>('list', { default: [] })
const listCopy = ref<any[]>() // copy prev version to handle updates

const emit = defineEmits(['replace'])

const updateCopy = () => {
  listCopy.value = list.value
}

const onChange = (event: SortableEvent) => {
  if (event.oldIndex !== event.newIndex) {
    emit('replace', event.oldIndex, event.newIndex, listCopy.value)

    updateCopy()
  }
}
</script>

<style scoped lang="scss">
.drag-drop-list {
  padding-left: 0;

  li + li {
    margin-top: 0.5rem;
  }

  li {
    position: relative;

    display: flex;
    flex-wrap: wrap;

    padding: 0.25rem 0.25rem 0.25rem 2.25rem;
    border-radius: 4px;
  }

  li.ghost {
    background-color: var(--bg-transparent);
  }

  .drag-icon {
    position: absolute;

    margin-top: auto;
    margin-bottom: auto;

    padding: 0.25rem;
    width: 2rem;
    height: 2rem;

    top: 0;
    bottom: 0;
    left: 0;

    fill: var(--text-transparent);
    opacity: 0;

    cursor: pointer;
  }

  li:not(.ghost):hover > .drag-icon {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    .drag-icon {
      opacity: 0.5;
    }
  }
}
</style>
