<template>
  <ul class="drag-drop-list">
    <li
      v-for="(item, i) in list"
      :key="i"
      :class="{ dragged: i === draggedIndex }"
      v-show="filterFunc ? filterFunc(i, item) : true"
      draggable="true"
      @dragover.prevent="onDragOver(i)"
      @dragend="onDragEnd"
      @dragstart="onDragStart(i)"
      @drop="onDrop(i)"
    >
      <DragDropIcon class="drag-icon" width="16" height="16" aria-hidden="true" />
      <slot name="item" :item="item" :index="i" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DragDropIcon from "@/assets/icons/drag-drop.svg";

const props = defineProps<{
  list: any[];
  filterFunc?: (i: number, item: any) => {};
}>();

const emit = defineEmits(["update:list"]);

const draggedIndex = ref<number | null>(null);

const onDragStart = (i: number) => {
  draggedIndex.value = i;
};

const onDragOver = (i: number) => {
  if (draggedIndex.value === null || draggedIndex.value === i) return;

  const localList = props.list;

  const temp = localList[i];
  localList[i] = localList[draggedIndex.value];
  localList[draggedIndex.value] = temp;

  draggedIndex.value = i;

  emit("update:list", localList);
};

const onDrop = (i: number) => {
  draggedIndex.value = null;
};

const onDragEnd = () => {
  draggedIndex.value = null;
};
</script>

<style scoped lang="scss">
.drag-drop-list {
  list-style: none;
  padding: 1em;

  li + li {
    margin-top: 1rem;
  }

  li {
    position: relative;
    background-color: antiquewhite;
  }

  li.dragged {
    background-color: var(--bg-basic);
  }

  .drag-icon {
    position: absolute;

    padding: 0.25rem;
    width: 2rem;
    height: 2rem;

    top: -0.5rem;
    left: -1rem;

    opacity: 0;

    cursor: pointer;
  }

  li:hover > .drag-icon,
  li.dragged > .drag-icon {
    opacity: 1;
  }
}
</style>
