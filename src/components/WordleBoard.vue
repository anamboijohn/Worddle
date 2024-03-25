<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG, WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value)
  }
})

const word = ref<string | null>(null)
const submitted = ref(false)

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
  submitted.value = true
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
  <input
    type="text"
    name="word"
    id="word"
    v-model="formattedWord"
    @keydown.enter="onSubmit"
    @keydown="onKeyDown"
  />
  <p v-if="submitted" v-text="word == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG"></p>
</template>
