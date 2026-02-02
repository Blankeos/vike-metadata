import { createEffect, createSignal } from 'solid-js';
import { usePageContext } from 'vike-solid/usePageContext';
import { useMetadata } from 'src';

export default function Page() {
  const pageContext = usePageContext();
  const urlPathname = () => pageContext.urlPathname || '';
  const prefix = '/catchall/';
  const slug = () =>
    urlPathname().startsWith(prefix)
      ? urlPathname().slice(prefix.length)
      : urlPathname().replace(/^\//, '');
  const normalizedSlug = () => slug() || '(root)';

  const [previousSlug, setPreviousSlug] = createSignal(normalizedSlug());

  createEffect(() => {
    setPreviousSlug(normalizedSlug());
  });

  createEffect(() => {
    useMetadata({
      title: `Catchall ${normalizedSlug()}`,
      description: 'Catchall example page',
      keywords: ['Catchall', 'Page'],
    });
  })

  return (
    <div>
      <h1>CATCHALL</h1>
      <div>
        <div>URL pathname: {urlPathname()}</div>
        <div>Slug: {normalizedSlug()}</div>
        <div>Previous slug: {previousSlug()}</div>
        <div>Slug changed: {previousSlug() !== normalizedSlug() ? 'yes' : 'no'}</div>
      </div>
      <div>
        <a href="/catchall/one">/catchall/one</a>
        <span>{' | '}</span>
        <a href="/catchall/two">/catchall/two</a>
      </div>
    </div>
  );
}
