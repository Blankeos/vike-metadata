<template>
  <div>
    <nav>
      <a href="/">Home</a>
      <span>{{ ' | ' }}</span>
      <a href="/about">About</a>
      <span>{{ ' | ' }}</span>
    </nav>
    <slot />
  </div>
</template>

<script lang="ts">
import { useMetadata } from 'src';

useMetadata.setGlobalDefaults({
  title: 'Vike + Vue',
  description: 'Demo showcasing Vike + Vue',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
});
</script>
