<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WordleBoard from './components/WordleBoard.vue'
</script>

<template>
  <wordle-board word-of-the-day="You did it!" />
  <RouterView />
</template>
