<template>
  <PageContainer header="Today I need to">
    <TaskForm v-model="newTask" placeholder="Add new todo..." @submit="handleInput" />
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/layout/page-container/Index.vue";
import TaskForm from "@/components/task-form/Index.vue";

import { ref } from "vue";

const newTask = ref<string>("");

const handleInput = () => {
  console.log("New task value: ", newTask.value);
};
</script>

<style scoped lang="scss"></style>
