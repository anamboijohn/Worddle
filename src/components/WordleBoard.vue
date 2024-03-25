<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessInput from './GuessInput.vue'
import { ref } from 'vue'
defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value)
  }
})

const guessSubmitted = ref('')
</script>

<template>
  <guess-input @guess-submitted="(guess) => (guessSubmitted = guess)" />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG"
  ></p>
</template>
