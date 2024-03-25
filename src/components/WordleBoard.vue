<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessInput from './GuessInput.vue'
import { ref } from 'vue'
defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value),
    required: true
  }
})

const guessSubmitted = ref<string[]>([])
</script>

<template>
  <main>
    <guess-input @guess-submitted="(guess) => guessSubmitted.push(guess)" />
    <p
      class="end-of-game-message"
      v-if="guessSubmitted.length == 6 || guessSubmitted.includes(wordOfTheDay)"
      v-text="guessSubmitted.includes(wordOfTheDay) ? VICTORY_MSG : DEFEAT_MSG"
    ></p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}
.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}
@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
