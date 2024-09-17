<template>
  <label class="theme-switcher">
    <input
      v-model="isDark"
      value="dark"
      name="theme"
      type="checkbox"
      :aria-label="'switch theme to ' + isDark ? 'daymode' : 'nightmode'"
      @change="changeTheme"
    />
    <span class="icon-wrapper">
      <component :is="isDark ? Moon : Sun" aria-hidden="true" />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import Moon from '@/assets/icons/moon.svg?component'
import Sun from '@/assets/icons/sun.svg?component'

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

<style scoped lang="scss">
.theme-switcher {
  position: relative;
  display: inline-block;

  width: 2.2rem;
  height: 1.2rem;

  border: 1px solid var(--bg-basic);
  border-radius: 0.6rem;

  color: var(--bg-basic);

  cursor: pointer;

  input {
    appearance: none;
  }

  .icon-wrapper {
    position: absolute;
    inset: 1px;
    border-radius: 50%;

    width: fit-content;

    transition: transform var(--trans-default);
    transform: translateX(0);

    svg {
      fill: currentColor;
    }
  }

  input:checked + .icon-wrapper {
    transform: translateX(100%);
  }
}
</style>
