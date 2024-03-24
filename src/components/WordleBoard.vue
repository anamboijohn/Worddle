<script setup lang="ts">
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <input type="text" name="word" id="word" />
  <p>Congratulations! You guessed the word of the day!</p>
</template>
