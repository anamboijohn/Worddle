<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG } from '@/settings'
import { ref } from 'vue'
defineProps<{
  wordOfTheDay: string
}>()

const word = ref('')
const submitted = ref(false)
</script>

<template>
  <input type="text" name="word" id="word" v-model="word" @keydown.enter="submitted = true" />
  <p v-if="submitted">{{ word == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG }}</p>
</template>
