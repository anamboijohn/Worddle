<script setup lang="ts">
import { VICTORY_MSG, DEFEAT_MSG } from '@/settings'
import { ref } from 'vue'
defineProps<{
  wordOfTheDay: string
}>()

const word = ref('')
</script>

<template>
  <input type="text" name="word" id="word" v-model="word" />
  <p>{{ word == wordOfTheDay ? VICTORY_MSG : DEFEAT_MSG }}</p>
</template>
