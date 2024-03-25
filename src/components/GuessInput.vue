<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessView from '@/components/GuessView.vue'

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })

const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()

const word = ref<string | null>(null)

const formattedWord = computed<string>({
  get: () => word.value ?? '',
  set: (value: string) => {
    word.value = null
    word.value = value
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '')
  }
})

const onSubmit = () => {
  if (!englishWords.includes(formattedWord.value)) {
    return
  }
  emit('guess-submitted', formattedWord.value)

  word.value = null
}

const onKeyDown = (event: KeyboardEvent) => {
  const char = event.key.toUpperCase()
  if (
    (!/^[A-Z]$/.test(char) || formattedWord.value.length >= WORD_SIZE) &&
    char !== 'BACKSPACE' &&
    char !== 'DELETE'
  ) {
    event.preventDefault()
  }
}
</script>

<template>
  <guess-view v-if="!disabled" :guess="formattedWord" />

  <input
    type="text"
    name="word"
    id="word"
    :maxlength="WORD_SIZE"
    :disabled="disabled"
    aria-label="Make your guess for the word of the day!"
    v-model="formattedWord"
    @keydown.enter="onSubmit"
    @keydown="onKeyDown"
    autofocus
    @blur="({ target }) => (target as HTMLInputElement).focus()"
  />
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}
</style>
