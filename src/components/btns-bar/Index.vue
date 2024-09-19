<template>
  <div class="btns-bar">
    <div class="btn-wrapper" v-for="(btn, name) in buttons" :key="name" v-show="btn.show">
      <button :disabled="btn.disabled" :class="{ selected: btn.selected }" @click="btn.action">
        {{ btn.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Buttons {
  [key: string]: {
    name: string
    action: () => void
    show: boolean
    disabled?: boolean
    selected?: boolean
  }
}

defineProps<{
  buttons: Buttons
  disabled?: boolean
}>()
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.btns-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .btn-wrapper {
    display: flex;
    justify-content: center;

    &:first-child {
      margin-right: 0.6rem;
    }

    &:last-child {
      margin-left: 0.6rem;
    }
  }

  button {
    @include button13;

    display: inline-block;
    padding: 0.5rem 0.75rem;

    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    color: var(--txt-basic);

    cursor: pointer;

    transition: all var(--trans-default);

    &:active:not(:disabled),
    &.selected:not(:disabled) {
      background-color: var(--btn-bg);
      color: var(--btn-text);
    }

    &:disabled {
      color: var(--txt-neutral);
      cursor: not-allowed;
    }

    @media hover {
      &:hover:not(:disabled) {
        border-color: var(--btn-outline);
      }
    }
  }

  @media (max-width: 767px) {
    .btn-wrapper:first-child,
    .btn-wrapper:last-child {
      flex-basis: 100%;
      width: fit-content;
      margin: 0.5rem auto;
    }
  }
}
</style>
