<template>
  <form class="task-form" @submit.prevent="onFormSubmit">
    <input
      v-model="newTask"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :aria-label="ariaLabel"
      :disabled="disabled"
    />
    <button v-show="showBtn" type="submit" :disabled="btnDisabled">Submit</button>
    <div v-show="computedError" class="error">{{ computedError }}</div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  placeholder: String,
  maxlength: {
    type: Number,
    default: 66
  },
  ariaLabel: String,
  disabled: Boolean,
  error: {
    type: String,
    default: null
  }
})

const newTask = defineModel<string>('newTask')

const emit = defineEmits(['submit'])

const onFormSubmit = () => {
  emit('submit')
  newTask.value = ''
}

const showBtn = computed<boolean>(() => {
  return Boolean(newTask.value && newTask.value.trim()?.length > 0)
})

const btnDisabled = computed<boolean>(() => {
  return Boolean(computedError.value) || props.disabled
})

const computedError = computed<string | null>(() => {
  const isValid = !newTask.value || newTask.value?.length < props.maxlength
  return props.error || (isValid ? null : `Character limit is ${props.maxlength} characters`)
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.task-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  input {
    @include body14;

    flex: 1 0 auto;

    padding: 0.75rem;

    border-radius: 0.5rem;
    border: 1px solid var(--outline);
    background-color: var(--bg-basic);
    color: var(--text-basic);

    &::placeholder {
      color: var(--text-neutral);
    }

    &:focus {
      outline: none;
    }

    &:focus,
    &:hover {
      border-color: var(--btn-bg);
    }
  }

  button {
    @include button13;

    flex: 0 1 auto;

    padding: 0.75rem 1rem;
    border: none;

    border-radius: 0.5rem;
    color: var(--btn-text);
    background-color: var(--btn-bg);

    cursor: pointer;

    transition: color var(--trans-default);

    &:focus:not(:disabled),
    &:hover:not(:disabled) {
      color: var(--text-basic);
    }

    &:disabled {
      cursor: not-allowed;
      background-color: var(--text-neutral);
    }
  }

  .error {
    @include caption12;

    flex: 1 1 100%;
    color: var(--danger);
    text-align: left;
  }

  @media (max-width: 767px) {
    gap: 0.5rem;

    button {
      flex: 1 1 100%;
    }
  }
}
</style>
