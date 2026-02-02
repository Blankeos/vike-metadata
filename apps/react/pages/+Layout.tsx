import { PropsWithChildren } from 'react';
import { useMetadata } from 'src';

useMetadata.setGlobalDefaults({
  title: 'Vike + React',
  description: 'Demo showcasing Vike + React',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
});

export default function RootLayout(props: PropsWithChildren) {
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <span>{' | '}</span>
        <a href="/about">About</a>
        <span>{' | '}</span>
        <a href="/nossr">No SSR</a>
        <span>{' | '}</span>
        <a href="/catchall/one">Catchall</a>
      </nav>
      {props?.children}
    </div>
  );
}
