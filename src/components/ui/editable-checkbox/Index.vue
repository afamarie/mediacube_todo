<template>
  <div class="editable-checkbox">
    <div class="input-wrapper" :aria-label="value">
      <input v-model="checked" :value="value" :name="name" type="checkbox" :disabled="disabled" />
      <span class="editable-wrapper">
        <span
          class="editable"
          :contenteditable="editable"
          @blur="onBlur"
          @keydown.enter="onEnter"
          @keydown.escape="onEsc"
          @click="onClick"
          ref="editableRef"
          >{{ value }}
        </span>
      </span>
    </div>
    <div class="btns">
      <button class="edit" :class="{ editable }" @click="edit">
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
const editableRef = ref<HTMLElement | null>(null)

const switchIsEditable = () => {
  editable.value = !editable.value
}

const edit = () => {
  switchIsEditable()
  // set the caret (cursor) position in the editable label
  nextTick(() => {
    editableRef.value?.focus()

    const range = document.createRange()
    const selection = window.getSelection()

    range.selectNodeContents(editableRef.value as Node)
    range.collapse(false)

    selection?.removeAllRanges()
    selection?.addRange(range)
  })
}

const submitEdit = (event: Event) => {
  const edited = (event.target as HTMLElement)?.innerText.trim()

  if (edited) {
    emit('update:value', edited)
  } else {
    emit('delete')
  }

  switchIsEditable()
}

const rejectEdit = (event: Event) => {
  const target = event.target as HTMLElement
  target.innerText = value.value || ''

  switchIsEditable()
}

// pretends input label behavior if editable is false
const onClick = () => {
  if (!editable.value) {
    checked.value = !checked.value
  }
}

const onEnter = (event: Event) => {
  submitEdit(event)
  editableRef.value?.blur()
}

const onEsc = (event: Event) => {
  rejectEdit(event)
  editableRef.value?.blur()
}

const onBlur = (event: Event) => {
  if (editable.value) submitEdit(event)
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.editable-checkbox {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;

  .input-wrapper {
    display: grid;
    grid-template-columns: 1.6rem 1fr;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;
  }

  .editable-wrapper {
    @include input16;

    padding: 0.25rem;
    max-width: 100%;
    overflow-x: auto;

    color: var(--text-basic);
  }

  .editable-wrapper:focus-within {
    background-color: var(--bg-transparent);
  }

  .editable[contenteditable='true'] {
    cursor: text;
  }

  .editable:focus {
    outline: none;
  }

  input:checked + .editable {
    color: var(--text-transparent);
  }

  input {
    appearance: none;

    width: 1.6rem;
    height: 1.6rem;

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

    &.editable {
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
