<script setup lang="ts">
import { WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'

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
  <ul class="word">
    <li
      v-for="(letter, index) in formattedWord.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      :data-letter="letter"
      class="letter"
      v-text="letter"
    />
  </ul>

  <input
    type="text"
    name="word"
    id="word"
    :maxlength="WORD_SIZE"
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
.word {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.25rem;
}
.letter {
  background-color: white;
  border: 1px solid hsl(0, 0%, 70%);
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
}
li:not([data-letter=' ']) {
  animation: pop 100ms;
}
@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
}
</style>
