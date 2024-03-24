<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG, WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { on } from 'events'
defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value)
  }
})

const word = ref('')
const submitted = ref(false)

const formattedWord = computed({
  get: () => word.value,
  set: (value: string) => (word.value = value.slice(0, WORD_SIZE).toUpperCase())
})

const onSubmit = () => {
  if (!englishWords.includes(word.value)) {
    return
  }
  submitted.value = true
}
</script>
<!-- 
  <script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG, WORD_SIZE } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { on } from 'events'
defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value)
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')

const formattedWord = computed({
  get: () => guessInProgress.value,
  set: (value: string) => (guessInProgress.value = value.slice(0, WORD_SIZE))
})

const onSubmit = () => {
  if (!englishWords.includes(guessInProgress.value)) {
    return
  }
  guessSubmitted.value = guessInProgress.value
}
</script>

<template>
  <input
    type="text"
    name="word"
    id="word"
    v-model="formattedWord"
    @keydown.enter="onSubmit"
    maxlength="WORD_SIZE"
  />
  <p v-if="guessSubmitted.length > 0">
    {{ guessSubmitted == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG }}
  </p>
</template>

 -->
<template>
  <input type="text" name="word" id="word" v-model="formattedWord" @keydown.enter="onSubmit" />
  <p v-if="submitted">{{ word == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG }}</p>
</template>
