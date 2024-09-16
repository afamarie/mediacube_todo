<template>
  <input v-model="isDark" value="dark" name="theme" type="checkbox" @change="changeTheme" />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'

const htmlElement = document.documentElement
const isDark = ref<boolean>()

const theme = computed<string>(() => {
  return isDark.value ? 'dark' : 'light'
})

const changeTheme = () => {
  htmlElement.setAttribute('theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

const setSavedTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  htmlElement.setAttribute('theme', theme.value)
}

onBeforeMount(() => {
  if (localStorage.getItem('theme')) {
    setSavedTheme()
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})
</script>

<style></style>
