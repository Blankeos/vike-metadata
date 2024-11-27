import { useMetadata } from 'src';

export default function Page() {
  useMetadata({
    title: 'About',
    description: 'About page description',
    keywords: ['About', 'Page'],
  });

  return (
    <>
      <div>
        <h1>ABOUT</h1>
      </div>
    </>
  );
}
