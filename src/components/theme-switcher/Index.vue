<template>
  <label class="theme-switcher">
    <span class="label" aria-hidden="true">{{ isDark ? 'nightmode' : 'daymode' }}</span>
    <span class="input-wrapper">
      <input
        v-model="isDark"
        value="dark"
        name="theme"
        type="checkbox"
        :aria-label="isDark ? 'switch theme to daymode' : 'switch theme to nightmode'"
        @change="changeTheme"
      />
      <span class="icon-wrapper">
        <component :is="isDark ? Moon : Sun" aria-hidden="true" />
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import Moon from '@/assets/icons/moon.svg'
import Sun from '@/assets/icons/sun.svg'

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
@import '@/assets/styles/mixins.scss';

.theme-switcher {
  @include caption12;

  display: flex;
  align-items: center;

  cursor: pointer;

  .label {
    margin-right: 0.5rem;

    color: var(--bg-basic);
    font-weight: 700;
  }

  .input-wrapper {
    position: relative;
    display: inline-block;

    width: 3rem;
    height: 1.5rem;

    border: 2px solid var(--bg-basic);
    border-radius: 1rem;

    color: var(--bg-basic);
  }

  input {
    appearance: none;
  }

  .icon-wrapper {
    position: absolute;

    inset: 2px;
    border-radius: 50%;
    width: 50%;

    transform: translateX(0);
    transition: transform var(--trans-default);

    svg {
      fill: currentColor;
      vertical-align: baseline;
    }
  }

  input:checked + .icon-wrapper {
    justify-content: flex-end;
    transform: translateX(110%);
  }
}
</style>
