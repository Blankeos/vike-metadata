import { type FlowProps } from 'solid-js';
import { useMetadata } from 'src';
import { usePageContext } from 'vike-solid/usePageContext';

useMetadata.setGlobalDefaults({
  title: 'Vike + Solid',
  description: 'Demo showcasing Vike + Solid',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
});

export default function RootLayout(props: FlowProps) {
  const pageContext = usePageContext();

  return (
    <>
      <div>
        <nav>
          <a href="/">Home</a>
          <span>{' | '}</span>
          <a href="/about">About</a>
          <span>{' | '}</span>
          <a href="/nossr">No SSR</a>
        </nav>
        {props.children}
      </div>
    </>
  );
}
