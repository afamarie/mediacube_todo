<template>
  <div class="btns-bar">
    <div
      class="btn-wrapper"
      v-for="(btn, name) in buttons"
      :key="name"
      :disabled="btn.disabled"
      v-show="btn.show"
    >
      <button @click="btn.action">
        {{ btn.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Buttons {
  [key: string]: {
    name: string;
    action: () => void;
    show: boolean;
    disabled?: boolean;
  };
}

defineProps<{
  buttons: Buttons;
  disabled?: boolean;
  checked?: boolean;
}>();
</script>

<style scoped lang="scss">
@import "@/assets/styles/mixins.scss";

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

    cursor: pointer;

    transition: all var(--trans-default);

    &:hover:not(:disabled) {
      border-color: var(--btn-outline);
    }

    &:active:not(:disabled),
    &.checked:not(:disabled) {
      background-color: var(--btn-bg);
      color: var(--btn-text);
    }

    &:disabled {
      color: var(--txt-neutral);
      cursor: not-allowed;
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
