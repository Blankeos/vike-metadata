import { PropsWithChildren } from 'react';
import { useMetadata } from 'src';
import { usePageContext } from 'vike-solid/usePageContext';

export default function RootLayout(props: PropsWithChildren) {
  const pageContext = usePageContext();

  useMetadata.setGlobalDefaults({
    title: 'Vike + React',
    description: 'Demo showcasing Vike + React',
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
  });

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <span>{' | '}</span>
        <a href="/about">About</a>
        <span>{' | '}</span>
      </nav>
      {props?.children}
    </div>
  );
}
