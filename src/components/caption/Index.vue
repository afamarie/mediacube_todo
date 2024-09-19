<template>
  <p class="caption">
    <CheckMarkIcon aria-hidden="true" />
    <span>Congrats, you have no more tasks to do</span>
  </p>
</template>

<script setup lang="ts">
import CheckMarkIcon from '@/assets/icons/checkmark-round.svg'
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.caption {
  @include body14;

  text-align: center;
  color: var(--text-neutral);

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
}
</style>
