import React from 'react';

import { useConfig } from 'vike-react/useConfig';

import {
  _RemoveArray,
  Twitter,
  UseMetadataParams as UseMetadataParamsBase,
} from '../../internals/src/types';

import {
  parseFormatDetection,
  parseKeywords,
  parseRobotsInfo,
  parseViewport,
} from '../../internals/src/parse-utilities';

import {
  createIfNotExistsMetaName,
  createIfNotExistsMetaProperty,
} from '../../internals/src/vanilla-utilities';

// ===========================================================================
// Hook
// ===========================================================================

export interface UseMetadataParams extends UseMetadataParamsBase {
  /**
   * If you prefer not using the type-safe data format and just want to copy-paste
   * whatever meta you currently have. You can also just paste it here.
   *
   * otherJSX: () => (
   *    <>
   *       <meta ... />
   *       <meta ... />
   *       <meta ... />
   *    </>
   * );
   */
  otherJSX?: () => React.ReactNode;
}

function _useMetadata(params: UseMetadataParams, DEFAULT_CONFIG: UseMetadataParams) {
  const setConfig = useConfig();

  const values = {
    // Sensible Title & Description Defaults for HTML, OG, and Twitter.
    title: params.title ?? DEFAULT_CONFIG.title,
    description: params.description ?? DEFAULT_CONFIG.description,

    // Other values here:
    generator: params.generator ?? DEFAULT_CONFIG.generator,
    applicationName: params.applicationName ?? DEFAULT_CONFIG.applicationName,
    referrer: params.referrer ?? DEFAULT_CONFIG.referrer,
    keywords: params.keywords ?? DEFAULT_CONFIG.keywords,
    authors: params.authors ?? DEFAULT_CONFIG.authors,
    creator: params.creator ?? DEFAULT_CONFIG.creator,
    publisher: params.publisher ?? DEFAULT_CONFIG.publisher,
    formatDetection: params.formatDetection ?? DEFAULT_CONFIG.formatDetection,

    // Open Graph
    openGraph: {
      title: params.openGraph?.title ?? params.title ?? DEFAULT_CONFIG.title,
      description:
        params.openGraph?.description ?? params.description ?? DEFAULT_CONFIG.description,
      url: params.openGraph?.url ?? DEFAULT_CONFIG?.openGraph?.url,
      siteName: params.openGraph?.siteName ?? DEFAULT_CONFIG?.openGraph?.siteName,
      images: params.openGraph?.images ?? DEFAULT_CONFIG?.openGraph?.images,
      videos: params.openGraph?.videos ?? DEFAULT_CONFIG?.openGraph?.videos,
      audio: params.openGraph?.audio ?? DEFAULT_CONFIG?.openGraph?.audio,
      locale: params.openGraph?.locale ?? DEFAULT_CONFIG?.openGraph?.locale,
      type: ((params.openGraph as any)?.type ?? (DEFAULT_CONFIG?.openGraph as any)?.type) as
        | string
        | undefined,
    },

    // Robots
    robots: params.robots ?? DEFAULT_CONFIG.robots,

    // Icons
    icons: params.icons ?? DEFAULT_CONFIG.icons,

    // Manifest
    manifest: params.manifest ?? DEFAULT_CONFIG.manifest,

    // Twitter
    twitter: {
      // Metadata
      creator: params.twitter?.creator ?? DEFAULT_CONFIG?.twitter?.creator,
      creatorId: params.twitter?.creatorId ?? DEFAULT_CONFIG?.twitter?.creatorId,
      description: params.twitter?.description ?? params.description ?? DEFAULT_CONFIG.description,
      images: params.twitter?.images ?? DEFAULT_CONFIG?.twitter?.images,
      site: params.twitter?.site ?? DEFAULT_CONFIG?.twitter?.site,
      siteId: params.twitter?.siteId ?? DEFAULT_CONFIG?.twitter?.siteId,
      title: params.twitter?.title ?? params.title ?? DEFAULT_CONFIG.title,

      // Card
      card: ((params.twitter as any)?.card ?? (DEFAULT_CONFIG?.twitter as any)?.card) as
        | string
        | undefined,

      // Player
      players:
        (params.twitter as Extract<Twitter, { card: 'player' }>)?.players ??
        (DEFAULT_CONFIG?.twitter as any)?.players,

      // App
      app:
        (params?.twitter as Extract<Twitter, { card: 'app' }>)?.app ??
        (DEFAULT_CONFIG?.twitter as any)?.app,
    },

    // ViewPort
    viewport: params.viewport ?? DEFAULT_CONFIG.viewport,

    // Verification
    verification: params.verification ?? DEFAULT_CONFIG.verification,

    // Other
    other: params.other ?? DEFAULT_CONFIG.other,

    // Other JSX
    otherJSX: params.otherJSX ?? DEFAULT_CONFIG.otherJSX,
  };

  function Head_() {
    return (
      <>
        {renderMetaName('generator', values.generator)}
        {renderMetaName('application-name', values.applicationName)}
        {renderMetaName('referrer', values.referrer)}
        {renderMetaName(
          'keywords',
          values?.keywords?.length ? parseKeywords(values.keywords) : null,
        )}
        {renderArrayable(values?.authors, (item) => (
          <>
            {renderMetaName('author', item.name)}
            {item.url ? <link rel="author" href={item.url?.toString()} /> : null}
          </>
        ))}
        {renderMetaName('creator', values?.creator)}
        {renderMetaName('publisher', values?.publisher)}
        {renderMetaName(
          'format-detection',
          values?.formatDetection ? parseFormatDetection(values.formatDetection) : null,
        )}

        {renderOpenGraphMetadata(values?.openGraph)}

        {renderMetaName('robots', values?.robots ? parseRobotsInfo(values.robots) : null)}

        {renderMetaName(
          'googlebot',
          (values?.robots as any)?.googleBot
            ? parseRobotsInfo((values?.robots as any)?.googleBot)
            : null,
        )}

        {renderIconsMetadata(values.icons)}

        {values?.manifest ? <link rel="manifest" href={values.manifest?.toString()} /> : null}

        {renderTwitterMetadata(values.twitter)}

        {renderViewPortMetadata(values.viewport)}

        {renderMetaNameMap(values?.verification)}

        {renderMetaNameMap(values?.other)}

        {values?.otherJSX?.()}
      </>
    );
  }

  setConfig({
    title: values.title,
    description: values.description,
    /** @ts-ignore */
    Head: Head_,
  });

  // Special Workarounds

  // > Server-side
  if (typeof window === 'undefined') {
  }
  // > Client-side
  else {
    if (values.title) {
      document.title = values.title;
    }
    if (values.openGraph.title) {
      createIfNotExistsMetaProperty('og:title', values.openGraph.title);
    }
    if (values.description) {
      createIfNotExistsMetaName('description', values.description);
    }

    if (values.openGraph.description) {
      createIfNotExistsMetaProperty('og:description', values.openGraph.description);
    }

    if (values.twitter.title) {
      createIfNotExistsMetaName('twitter:title', values.twitter.title);
    }

    if (values.twitter.description) {
      createIfNotExistsMetaName('twitter:description', values.twitter.description);
    }

    if (values.keywords?.length) {
      createIfNotExistsMetaName('keywords', parseKeywords(values.keywords));
    }
  }
}

/**
 * Alternative way to set default values via a factory pattern.
 *
 * @example
 * import { initUseMetadata } from 'vike-metadata-react';
 *
 * export const useMetadata = initUseMeta({
 *  // Add defaults here...
 * })
 */
export function initUseMetadata(config: UseMetadataParams) {
  return (params: UseMetadataParams) => _useMetadata(params, config);
}

let GLOBAL_DEFAULTS: UseMetadataParams = {};
function setGlobalDefaults(config: UseMetadataParams) {
  GLOBAL_DEFAULTS = config;
}

export type UseMetadataFunctionType = ((params: UseMetadataParams) => void) & {
  /**
   * Recommended way to set default values.
   *
   * @example
   * import { useMetadata } from 'vike-metadata-vue';
   *
   * useMetadata.setGlobalDefaults({
   *   title: 'Home | Solid Launch',
   *   description: 'An awesome app template by Carlo Taleon.',
   * })
   */
  setGlobalDefaults: (config: UseMetadataParams) => void;
};
/**
 *
 * @example
 * import { useMetadata } from 'vike-metadata-react';
 *
 * useMetadata.setGlobalDefaults({
 *    title: 'Home | Solid Launch',
 *    description: 'An awesome app template by Carlo Taleon.'
 * });
 *
 * export default function Page() {
 *    useMetadata({
 *       title: 'About | Solid Launch',
 *       description: 'An awesome about page template by Carlo Taleon.'
 *    })
 * }
 */
export const useMetadata: UseMetadataFunctionType = (params) => {
  return _useMetadata(params, GLOBAL_DEFAULTS);
};

/**
 * Recommended way to set default values.
 *
 * @example
 * import { useMetadata } from 'vike-metadata-react';
 *
 * useMetadata.setGlobalDefaults({
 *   title: 'Home | Solid Launch',
 *   description: 'An awesome app template by Carlo Taleon.',
 * })
 */
useMetadata.setGlobalDefaults = setGlobalDefaults;

// ===========================================================================
// Utilities
// ===========================================================================

// >>> Utilities for Server-Side (JS-framework specific)
function renderMetaName(name: string, value: any) {
  return value ? <meta name={name} content={value} /> : null;
}

function renderMetaProperty(property: string, value: any) {
  return value ? <meta property={property} content={value} /> : null;
}

function renderArrayable<T>(
  value: T,
  render: (item: _RemoveArray<T>, index: number) => React.ReactNode,
) {
  if (!value) return null;

  if (Array.isArray(value)) {
    return value.map(render);
  }

  return render(value as any, 0);
}

function renderOpenGraphMetadata(value: UseMetadataParams['openGraph']) {
  if (!value) return null;

  function _renderOGArticle(value: Extract<UseMetadataParams['openGraph'], { type: 'article' }>) {
    if (value.type !== 'article') return null;
    return (
      <>
        {renderArrayable(value.authors, (item) => renderMetaProperty('article:author', item))}
        {renderMetaProperty('article:expiration_time', value.expirationTime)}
        {renderMetaProperty('article:modified_time', value.modifiedTime)}
        {renderMetaProperty('article:published_time', value.publishedTime)}
        {renderMetaProperty('article:section', value.section)}
        {renderArrayable(value.tags, (item) => renderMetaProperty('article:tag', item))}
      </>
    );
  }

  function _renderOGBook(value: Extract<UseMetadataParams['openGraph'], { type: 'book' }>) {
    if (value.type !== 'book') return null;
    return (
      <>
        {renderArrayable(value.authors, (item) => renderMetaProperty('article:author', item))}
        {renderMetaProperty('book:isbn', value.isbn)}
        {renderMetaProperty('book:release_date', value.releaseDate)}
        {renderArrayable(value.tags, (item) => renderMetaProperty('article:tag', item))}
      </>
    );
  }

  function _renderOGProfile(value: Extract<UseMetadataParams['openGraph'], { type: 'profile' }>) {
    if (value.type !== 'profile') return null;
    return (
      <>
        {renderMetaProperty('profile:first_name', value.firstName)}
        {renderMetaProperty('profile:last_name', value.lastName)}
        {renderMetaProperty('profile:username', value.username)}
        {renderMetaProperty('profile:gender', value.gender)}
      </>
    );
  }

  function _renderOGMusicSong(
    value: Extract<UseMetadataParams['openGraph'], { type: 'music.song' }>,
  ) {
    if (value.type !== 'music.song') return null;
    return (
      <>
        {renderArrayable(value.albums, (item) => {
          if (typeof item === 'string' || item instanceof URL) {
            return renderMetaProperty('music:album', item);
          }

          return (
            <>
              {renderMetaProperty('music:album:disc', item?.disc)}
              {renderMetaProperty('music:album:track', item?.track)}
              {renderMetaProperty('music:album', item?.url)}
            </>
          );
        })}
        {renderMetaProperty('music:duration', value.duration)}
        {renderArrayable(value.musicians, (item) => renderMetaProperty('music:musician', item))}
      </>
    );
  }

  function _renderOGMusicAlbum(
    value: Extract<UseMetadataParams['openGraph'], { type: 'music.album' }>,
  ) {
    if (value.type !== 'music.album') return null;
    return (
      <>
        {renderArrayable(value.musicians, (item) => renderMetaProperty('music:musician', item))}
        {renderMetaProperty('music:release_date', value.releaseDate)}
        {renderArrayable(value.songs, (item) => {
          if (typeof item === 'string' || item instanceof URL) {
            return renderMetaProperty('music:song', item);
          }

          return (
            <>
              {renderMetaProperty('music:song:disc', item?.disc)}
              {renderMetaProperty('music:song:track', item?.track)}
              {renderMetaProperty('music:song', item?.url)}
            </>
          );
        })}
      </>
    );
  }

  function _renderOGMusicPlaylist(
    value: Extract<UseMetadataParams['openGraph'], { type: 'music.playlist' }>,
  ) {
    if (value.type !== 'music.playlist') return null;
    return (
      <>
        {renderArrayable(value.creators, (item) => renderMetaProperty('music:creator', item))}
        {renderArrayable(value.songs, (item) => {
          if (typeof item === 'string' || item instanceof URL) {
            return renderMetaProperty('music:song', item);
          }

          return (
            <>
              {renderMetaProperty('music:song:disc', item?.disc)}
              {renderMetaProperty('music:song:track', item?.track)}
              {renderMetaProperty('music:song', item?.url)}
            </>
          );
        })}
      </>
    );
  }

  function _renderOGMusicRadioStation(
    value: Extract<UseMetadataParams['openGraph'], { type: 'music.radio_station' }>,
  ) {
    if (value.type !== 'music.radio_station') return null;
    return (
      <>{renderArrayable(value.creators, (item) => renderMetaProperty('music:creator', item))}</>
    );
  }

  function _renderOGVideoMovie(
    value: Extract<UseMetadataParams['openGraph'], { type: 'video.movie' }>,
  ) {
    if (value.type !== 'video.movie') return null;
    return (
      <>
        {renderArrayable(value.actors, (item) => {
          if (typeof item === 'string' || item instanceof URL) {
            return renderMetaProperty('video:actor', item);
          }

          return (
            <>
              {renderMetaProperty('video:actor:role', item?.role)}
              {renderMetaProperty('video:actor', item?.url)}
            </>
          );
        })}

        {renderArrayable(value.directors, (item) => renderMetaProperty('video:director', item))}

        {renderMetaProperty('video:duration', value.duration)}
        {renderMetaProperty('video:release_date', value.releaseDate)}

        {renderArrayable(value.tags, (item) => renderMetaProperty('video.tag', item))}
        {renderArrayable(value.writers, (item) => renderMetaProperty('video:writer', item))}
      </>
    );
  }

  function _renderOGVideoEpisode(
    value: Extract<UseMetadataParams['openGraph'], { type: 'video.episode' }>,
  ) {
    if (value.type !== 'video.episode') return null;
    return (
      <>
        {renderArrayable(value.actors, (item) => {
          if (typeof item === 'string' || item instanceof URL) {
            return renderMetaProperty('video:actor', item);
          }

          return (
            <>
              {renderMetaProperty('video:actor:role', item?.role)}
              {renderMetaProperty('video:actor', item?.url)}
            </>
          );
        })}

        {renderArrayable(value.directors, (item) => renderMetaProperty('video:director', item))}

        {renderMetaProperty('video:duration', value.duration)}
        {renderMetaProperty('video:release_date', value.releaseDate)}
        {renderMetaProperty('video:series', value.series)}

        {renderArrayable(value.tags, (item) => renderMetaProperty('video.tag', item))}
        {renderArrayable(value.writers, (item) => renderMetaProperty('video:writer', item))}
      </>
    );
  }

  return (
    <>
      {renderArrayable(value?.alternateLocale, (item) =>
        renderMetaProperty('og:locale:alternate', item),
      )}
      {renderArrayable(value?.audio, (item) => {
        if (typeof item === 'string' || item instanceof URL) {
          return renderMetaProperty('og:audio', item?.toString());
        }

        return (
          <>
            {renderMetaProperty('og:audio', item?.url)}
            {renderMetaProperty('og:audio:type', item?.type)}
          </>
        );
      })}
      {renderMetaProperty('og:country-name', value?.countryName)}
      {renderMetaProperty('og:determiner', value?.determiner)}
      {renderArrayable(value?.emails, (item) => renderMetaProperty('og:email', item))}
      {renderArrayable(value?.faxNumbers, (item) => renderMetaProperty('og:fax_number', item))}

      {renderArrayable(value?.images, (item) => {
        if (typeof item === 'string' || item instanceof URL) {
          return renderMetaProperty('og:image', item?.toString());
        }

        return (
          <>
            {renderMetaProperty('og:image', item?.url)}
            {renderMetaProperty('og:image:secure_url', item?.secureUrl)}
            {renderMetaProperty('og:image:width', item?.width)}
            {renderMetaProperty('og:image:height', item?.height)}
            {renderMetaProperty('og:image:alt', item?.alt)}
          </>
        );
      })}
      {renderMetaProperty('og:locale', value?.locale)}
      {renderArrayable(value?.phoneNumbers, (item) => renderMetaProperty('og:phone_number', item))}
      {renderMetaProperty('og:site_name', value?.siteName)}
      {renderMetaProperty('og:ttl', value?.ttl)}
      {renderMetaProperty('og:url', value?.url)}

      {renderArrayable(value?.videos, (item) => {
        if (typeof item === 'string' || item instanceof URL) {
          return renderMetaProperty('og:video', item?.toString());
        }

        return (
          <>
            {renderMetaProperty('og:video', item?.url)}
            {renderMetaProperty('og:video:secure_url', item?.secureUrl)}
            {renderMetaProperty('og:video:type', item?.type)}
            {renderMetaProperty('og:video:width', item?.width)}
            {renderMetaProperty('og:video:height', item?.height)}
          </>
        );
      })}

      {renderMetaProperty('og:type', (value as any)?.type)}

      {_renderOGArticle(value as any)}
      {_renderOGBook(value as any)}
      {_renderOGProfile(value as any)}
      {_renderOGMusicSong(value as any)}
      {_renderOGMusicAlbum(value as any)}
      {_renderOGMusicPlaylist(value as any)}
      {_renderOGMusicRadioStation(value as any)}
      {_renderOGVideoMovie(value as any)}
      {_renderOGVideoEpisode(value as any)}
    </>
  );
}

function renderIconsMetadata(value: UseMetadataParams['icons']) {
  if (!value) return null;

  type IconLink = {
    url: string | URL;
    sizes?: string;
    type?: string;
    media?: string;
  };

  type IconOtherLink = IconLink & { rel: string };

  function renderIconLink(rel: string, item: string | URL | IconLink) {
    if (typeof item === 'string' || item instanceof URL) {
      return <link rel={rel} href={item.toString()} />;
    }

    return (
      <link
        rel={rel}
        href={item.url?.toString()}
        sizes={item.sizes}
        type={item.type}
        media={item.media}
      />
    );
  }

  function renderOtherIconLink(item: IconOtherLink) {
    return (
      <link
        rel={item.rel}
        href={item.url?.toString()}
        sizes={item.sizes}
        type={item.type}
        media={item.media}
      />
    );
  }

  return (
    <>
      {renderArrayable(value.icon, (item) => renderIconLink('icon', item))}
      {renderArrayable(value.shortcut, (item) => renderIconLink('shortcut icon', item))}
      {renderArrayable(value.apple, (item) => renderIconLink('apple-touch-icon', item))}
      {renderArrayable(value.other, (item) => renderOtherIconLink(item))}
    </>
  );
}

function renderTwitterMetadata(value: UseMetadataParams['twitter']) {
  if (!value) return null;

  function renderTwitterAppMetadata(value: Extract<Twitter, { card: 'app' }>['app']) {
    if (!value) return null;

    return (
      <>
        {renderMetaName('twitter:app:id:googleplay', value?.id?.googleplay)}
        {renderMetaName('twitter:app:url:googleplay', value?.url?.googleplay)}

        {renderMetaName('twitter:app:id:iphone', value?.id?.iphone)}
        {renderMetaName('twitter:app:url:iphone', value?.url?.iphone)}

        {renderMetaName('twitter:app:id:ipad', value?.id?.ipad)}
        {renderMetaName('twitter:app:url:ipad', value?.url?.ipad)}

        {renderMetaName(
          'twitter:app:name:googleplay',
          value?.id?.googleplay ? value?.name : undefined,
        )}
        {renderMetaName('twitter:app:name:iphone', value?.id?.iphone ? value?.name : undefined)}
        {renderMetaName('twitter:app:name:ipad', value?.id?.ipad ? value?.name : undefined)}
      </>
    );
  }

  return (
    <>
      {renderMetaName('twitter:creator', value.creator)}
      {renderMetaName('twitter:creator:id', value.creatorId)}
      {renderMetaName('twitter:description', value.description)}
      {renderMetaName('twitter:site', value.site)}
      {renderMetaName('twitter:site:id', value.siteId)}
      {renderMetaName('twitter:title', value.title)}

      {renderMetaName('twitter:card', (value as any).card)}

      {renderArrayable(value?.images, (item) => {
        if (typeof item === 'string' || item instanceof URL) {
          return <meta name="twitter:image" content={item?.toString()} />;
        }

        return (
          <>
            <meta name="twitter:image" content={item.url?.toString()} />;
            {renderMetaName('twitter:image:alt', item.alt)}
          </>
        );
      })}

      {renderArrayable((value as Extract<Twitter, { card: 'player' }>)?.players, (item) => (
        <>
          {renderMetaName('twitter:player', item.playerUrl)}
          {renderMetaName('twitter:player:width', item.width)}
          {renderMetaName('twitter:player:height', item.height)}
          {renderMetaName('twitter:player:stream', item.streamUrl)}
        </>
      ))}

      {renderTwitterAppMetadata((value as any)?.app)}
    </>
  );
}

function renderViewPortMetadata(value: UseMetadataParams['viewport']) {
  if (!value) return null;

  return (
    <>
      {renderMetaName('color-scheme', value.colorScheme)}
      {renderArrayable(value.themeColor, (item) => {
        if (typeof item === 'string') {
          return <meta name="theme-color" content={item} />;
        }

        if (item.media) {
          return <meta name="theme-color" media={item.media} content={item.color} />;
        }

        return <meta name="theme-color" content={item.color} />;
      })}
      {renderMetaName('viewport', parseViewport(value))}
    </>
  );
}

function renderMetaNameMap(records?: { [key: string]: string | number | (string | number)[] }) {
  if (!records) return null;

  return Object.entries(records).map(([_key, _value]) => {
    if (Array.isArray(_value)) {
      return renderArrayable(_value, (item) => renderMetaName(_key, item));
    }

    return renderMetaName(_key, _value);
  });
}
