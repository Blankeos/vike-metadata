import { createSignal } from 'solid-js';
import { useMetadata } from 'src';

export default function Page() {
  const [signal, setSignal] = createSignal(0);

  useMetadata({
    title: 'No SSR',
    description: 'No SSR page description',
    keywords: ['No SSR', 'Page'],
  });

  return (
    <div>
      <h1>NO SSR</h1>
      <button onClick={() => setSignal(signal() + 1)}>Increment {signal()}</button>
    </div>
  );
}
