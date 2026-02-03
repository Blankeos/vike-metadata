import { useEffect, useRef } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { useMetadata } from 'src';

export default function Page() {
  const pageContext = usePageContext();
  const urlPathname = pageContext.urlPathname || '';
  const prefix = '/catchall/';
  const slug = urlPathname.startsWith(prefix)
    ? urlPathname.slice(prefix.length)
    : urlPathname.replace(/^\//, '');
  const normalizedSlug = slug || '(root)';
  const isSecondRoute = slug === '2';

  const alternateIcons = {
    icon: '/icon-alt.svg',
    shortcut: '/icon-alt.svg',
    apple: '/icon-alt.svg',
  };

  const previousSlugRef = useRef(normalizedSlug);
  const previousSlug = previousSlugRef.current;
  const slugChanged = previousSlug !== normalizedSlug;

  useEffect(() => {
    previousSlugRef.current = normalizedSlug;
  }, [normalizedSlug]);

  useMetadata({
    title: `Catchall ${normalizedSlug}`,
    description: 'Catchall example page',
    keywords: ['Catchall', 'Page'],
    icons: isSecondRoute ? alternateIcons : undefined,
  });

  return (
    <div>
      <h1>CATCHALL</h1>
      <div>
        <div>URL pathname: {urlPathname}</div>
        <div>Slug: {normalizedSlug}</div>
        <div>Previous slug: {previousSlug}</div>
        <div>Slug changed: {slugChanged ? 'yes' : 'no'}</div>
      </div>
      <div>
        <a href="/catchall/1">/catchall/1</a>
        <span>{' | '}</span>
        <a href="/catchall/2">/catchall/2</a>
      </div>
    </div>
  );
}
