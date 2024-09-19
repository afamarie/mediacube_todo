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
      <button @click="edit">
        <PencilIcon />
      </button>
      <button @click="$emit('delete')">
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
  })
}

const submitEdit = (event: Event) => {
  const editedLabel = (event.target as HTMLElement)?.innerText.trim()
  labelRef.value?.blur()

  emit('update:value', editedLabel)
}

const rejectEdit = (event: Event) => {
  ;(event.target as HTMLElement).innerText = value.value || ''
  labelRef.value?.blur()
}
</script>

<style scoped lang="scss"></style>
