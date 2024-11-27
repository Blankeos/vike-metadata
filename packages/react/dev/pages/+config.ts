import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

// Default config (can be overridden by pages)
export default {
  stream: true,
  extends: [vikeReact],
} satisfies Config;
