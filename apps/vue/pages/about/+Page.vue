<template>
  <div>
    <h1>ABOUT</h1>
  </div>
</template>

<script setup lang="ts">
import { useMetadata } from 'src';

useMetadata({
  title: 'About',
  description: 'About page description',
  keywords: ['About', 'Page'],
});
</script>
