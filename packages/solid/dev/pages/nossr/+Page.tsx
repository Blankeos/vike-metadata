import { useMetadata } from 'src';

export default function Page() {
  useMetadata({
    title: 'No SSR',
    description: 'No SSR description',
  });

  return (
    <>
      <div>
        <h1>ABOUT</h1>
      </div>
    </>
  );
}
