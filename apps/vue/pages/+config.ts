import config from 'vike-vue/config';
import type { Config } from 'vike/types';

// Default config (can be overridden by pages)
export default {
  extends: [config],
} satisfies Config;
