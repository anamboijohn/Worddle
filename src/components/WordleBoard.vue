<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG } from '@/settings'
import { ref, computed } from 'vue'
import englishWords from '@/englishWordsWith5Letters.json'
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
  set: (value: string) => (word.value = value.slice(0, 5))
})
</script>

<template>
  <input
    type="text"
    name="word"
    id="word"
    v-model="formattedWord"
    @keydown.enter="submitted = true"
  />
  <p v-if="submitted">{{ word == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG }}</p>
</template>
