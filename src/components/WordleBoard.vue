<script setup lang="ts">
import { VICTORY_MSG } from '@/settings'
defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <input type="text" name="word" id="word" />
  <p>{{ VICTORY_MSG }}</p>
</template>
