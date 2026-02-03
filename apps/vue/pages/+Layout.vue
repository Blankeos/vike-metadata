<template>
  <div>
    <nav>
      <a href="/">Home</a>
      <span>{{ ' | ' }}</span>
      <a href="/about">About</a>
      <span>{{ ' | ' }}</span>
      <a href="/nossr">No SSR</a>
      <span>{{ ' | ' }}</span>
      <a href="/catchall/1">Catchall</a>
    </nav>
    <slot />
  </div>
</template>

<script lang="ts">
import { useMetadata } from 'src';

useMetadata.setGlobalDefaults({
  title: 'Vike + Vue',
  description: 'Demo showcasing Vike + Vue',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
});

export default {};
</script>
