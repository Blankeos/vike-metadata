import { useState } from 'react';
import { useMetadata } from 'src';

export default function Page() {
  const [state, setState] = useState(0);

  useMetadata({
    title: 'No SSR',
    description: 'No SSR page description',
    keywords: ['No SSR', 'Page'],
  });

  return (
    <div>
      <h1>NO SSR</h1>
      <button onClick={() => setState(state + 1)}>Increment {state}</button>
    </div>
  );
}
