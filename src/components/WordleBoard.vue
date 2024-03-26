<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG, MAX_GUESSES_COUNT } from '@/settings'
import englishWords from '@/englishWordsWith5Letters.json'
import GuessInput from './GuessInput.vue'
import { ref, computed } from 'vue'
import GuessView from '@/components/GuessView.vue'
const props = defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value),
    required: true
  }
})

const guessSubmitted = ref<string[]>([])

const isGameOver = computed(
  () =>
    guessSubmitted.value.length == MAX_GUESSES_COUNT ||
    guessSubmitted.value.includes(props.wordOfTheDay)
)

const countOfEmptyGuesses = computed(() => {
  const guessesRemaining = MAX_GUESSES_COUNT - guessSubmitted.value.length
  return isGameOver.value ? guessesRemaining : guessesRemaining - 1
})
</script>

<template>
  <main>
    <ul>
      <li v-for="(guess, index) in guessSubmitted" :key="`${index}-${guess}`">
        <guess-view :guess="guess" should-flip />
      </li>

      <li>
        <guess-input
          :disabled="isGameOver"
          @guess-submitted="(guess) => guessSubmitted.push(guess)"
        />
      </li>

      <li v-for="i in countOfEmptyGuesses" :key="`remaining-guess-${i}`">
        <guess-view guess="" />
      </li>
    </ul>
    <p
      class="end-of-game-message"
      v-if="isGameOver"
      v-text="guessSubmitted.includes(wordOfTheDay) ? VICTORY_MSG : DEFEAT_MSG"
    ></p>
  </main>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 0.25rem;
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
