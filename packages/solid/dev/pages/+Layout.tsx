import { type FlowProps } from 'solid-js';
import { useMetadata } from 'src';
import { usePageContext } from 'vike-solid/usePageContext';

export default function RootLayout(props: FlowProps) {
  const pageContext = usePageContext();

  useMetadata.setGlobalDefaults({
    title: 'Vike + Solid',
    description: 'Demo showcasing Vike + Solid',
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
  });
  return (
    <>
      <div>
        <nav>
          <a href="/">Home</a>
          <span>{' | '}</span>
          <a href="/about">About</a>
          <span>{' | '}</span>
          <a href="/nossr">NoSSR</a>
          <span>{' | '}</span>
        </nav>
        {props.children}
      </div>
    </>
  );
}
