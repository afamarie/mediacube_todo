<template>
  <div class="editable-checkbox">
    <label>
      <input v-model="checked" :value="value" :name="name" type="checkbox" :disabled="disabled" />
      <span
        class="label"
        :contenteditable="editable"
        @focusout="submitEdit"
        @keydown.enter="submitEdit"
        @keydown.escape="rejectEdit"
        ref="labelRef"
        >{{ value }}</span
      >
    </label>
    <div class="btns">
      <button class="edit" :class="{ isEditing }" @click="edit">
        <PencilIcon />
      </button>
      <button class="delete" @click="$emit('delete')">
        <BinIcon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import PencilIcon from '@/assets/icons/pencil.svg'
import BinIcon from '@/assets/icons/bin.svg'

const props = defineProps<{
  disabled?: boolean
  error?: {
    type: string
    default: null
  }
  name: string
}>()

const emit = defineEmits(['update:value', 'delete', 'update:checked'])

const checked = defineModel<boolean>('checked')
const value = defineModel<string>('value')

const editable = ref<boolean>()
const labelRef = ref<HTMLElement | null>(null)
const isEditing = ref<boolean>()

const switchIsEditing = () => {
  isEditing.value = !isEditing.value
}

const edit = () => {
  editable.value = true
  // set the caret (cursor) position in the editable label
  nextTick(() => {
    labelRef.value?.focus()

    const range = document.createRange()
    const selection = window.getSelection()

    range.selectNodeContents(labelRef.value as Node)
    range.collapse(false)

    selection?.removeAllRanges()
    selection?.addRange(range)

    switchIsEditing()
  })
}

const submitEdit = (event: Event) => {
  const editedLabel = (event.target as HTMLElement)?.innerText.trim()
  labelRef.value?.blur()

  switchIsEditing()

  emit('update:value', editedLabel)
}

const rejectEdit = (event: Event) => {
  const target = event.target as HTMLElement
  target.innerText = value.value || ''
  labelRef.value?.blur()
  switchIsEditing()
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.editable-checkbox {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;

  flex: 1 1 100%;

  label {
    display: flex;
    align-items: center;
  }

  .label {
    @include body14;

    padding: 0.25rem;
    color: var(--text-basic);
  }

  .label:focus {
    outline: none;
    background-color: var(--bg-transparent);
  }

  input:checked + .label {
    color: var(--text-transparent);
  }

  input {
    appearance: none;

    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.8rem;

    border: 1px solid var(--text-neutral);
    border-radius: 4px;

    transition: background-color background-image var(--trans-default);

    cursor: pointer;
  }

  input:checked {
    position: relative;

    border-color: transparent;
    background-color: var(--btn-bg);
    background-image: url('@/assets/icons/checkmark-plain.svg');

    background-size: 90%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    justify-self: end;
    align-self: center;
  }

  button {
    width: 1.6rem;
    height: 1.6rem;

    padding: 0.33rem;

    border: none;
    background-color: transparent;

    cursor: pointer;

    &.delete {
      color: var(--danger);
    }

    &.edit {
      color: var(--text-transparent);
    }

    &.isEditing {
      color: var(--success);
    }

    svg {
      height: 1rem;
      width: 1rem;

      fill: currentColor;
    }
  }
}
</style>
