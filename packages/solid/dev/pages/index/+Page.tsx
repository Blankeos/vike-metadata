import { createSignal } from 'solid-js';
import { useMetadata } from 'src/index';

export default function Page() {
  const [signal, setSignal] = createSignal(0);

  useMetadata({
    description: 'Home page description',
    keywords: ['Home', 'Page'],
  });

  return (
    <>
      <div>
        <h1>HOME</h1>
        <button onClick={() => createSignal(signal() + 1)}>Increment {signal()}</button>
      </div>
    </>
  );
}
