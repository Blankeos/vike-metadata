import { useState } from 'react';
import { useMetadata } from 'src';

export default function Page() {
  const [state, setState] = useState(0);

  useMetadata({
    description: 'Home page description',
    keywords: ['Home', 'Page'],
  });

  return (
    <>
      <div>
        <h1>HOME</h1>
        <button onClick={() => setState(state + 1)}>Increment {state}</button>
      </div>
    </>
  );
}
