// ===========================================================================
// Hook Types
// ===========================================================================
export type UseMetadataParams = {
  /**
   * If you're looking to do templates like `%s | Solid Launch` like Next.JS,
   * I'd argue the better way is to just create a utility function like:
   *
   * ```
   * const TITLE_TEMPLATE = '%s | Solid Launch';
   *
   * export function getTitle(title: string) {
   *    return TITLE_TEMPLATE.replace('%s', title);
   * }
   * ```
   *
   * @example
   * 'Home'
   * <title>Home</title>
   *
   * getTitle('Home')
   * <title>Home | Solid Launch</title>
   */
  title?: string;
  /**
   * @example
   * <meta name="description" content="An awesome app template by Carlo Taleon." />
   */
  description?: string;

  // ===========================================================================
  // Other types I copied from Next.js
  // ===========================================================================

  // >>> BASIC FIELDS
  /**
   * @example
   * <meta name="generator" content="Next.js" />
   */
  generator?: string;
  /**
   * @example
   * <meta name="application-name" content="Solid Launch" />
   */
  applicationName?: string;
  /**
   * @example
   * <meta name="referrer" content="origin-when-cross-origin" />
   */
  referrer?:
    | 'no-referrer'
    | 'origin'
    | 'no-referrer-when-downgrade'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin';
  /**
   * @example
   * <meta name="keywords" content="Next.js,React,JavaScript" />
   */
  keywords?: string | string[];
  /**
   * Has multiple behaviors.
   *
   * @example
   * "Josh"
   * <meta name="author" content="Josh" />
   *
   * { name: "Josh", url: "https://josh.com" }
   * <link rel="author" href="https://josh.com" />
   * <meta name="author" content="Josh" />
   */
  authors?: Author | Author[];
  /**
   * @example
   * <meta name="creator" content="Jiachi Liu" />
   */
  creator?: string;
  /**
   * @example
   * <meta name="publisher" content="Sebastian Markbåge" />
   */
  publisher?: string;
  /**
   * @example
   * <meta name="format-detection" content="telephone=no, address=no, email=no" />
   */
  formatDetection?: {
    address?: boolean;
    date?: boolean;
    email?: boolean;
    telephone?: boolean;
    url?: boolean;
  };

  // >>> OPEN GRAPH
  openGraph?: OpenGraph;

  /**
   * The robots setting for the document.
   *
   * @example
   * "index, follow"
   * <meta name="robots" content="index, follow" />
   *
   * { index: false, follow: false }
   * <meta name="robots" content="noindex, nofollow" />
   */
  robots?:
    | string
    | (RobotsInfo & {
        googleBot?: string | RobotsInfo;
      });

  // >>> Icons
  icons?: Icons;

  // >>> Manifest
  /**
   * Manifest.json path
   * <link rel="manifest" href="https://nextjs.org/manifest.json" />
   */
  manifest?: string | URL;

  // >>> Twitter
  twitter?: Twitter;

  /** ⭐️ */
  viewport?: ViewPort;

  /**
   *
   * @example
   * { verification: { google: "1234567890", yandex: "1234567890", "me": "1234567890" } }
   * <meta name="google-site-verification" content="1234567890" />
   * <meta name="yandex-verification" content="1234567890" />
   * <meta name="me" content="@me" />
   */
  verification?: { [key: string]: string };

  /**
   * ⭐️
   *
   * All metadata options should be covered using the built-in support. However,
   * there may be custom metadata tags specific to your site, or brand new metadata
   * tags just released. You can use the other option to render any custom metadata tag.
   *
   * @example
   * // { "xxx": "yyy"}
   * // Generates <meta name="xxx" content="yyy" />
   *
   * // { "xxx": [123, 456] }
   * // Generates
   * <meta name="xxx" content="123" />
   * <meta name="xxx" content="456" />
   *
   */
  other?: { [key: string]: string | number | (string | number)[] };
};

// ===========================================================================
// Internals
// ===========================================================================

export type _RemoveArray<T> = T extends any[] | undefined ? never : T;

export type IconDescriptor = {
  url: string | URL;
  sizes?: string;
  type?: string;
  media?: string;
};

export type IconDescriptorWithRel = IconDescriptor & {
  rel: string;
};

export type Icon = string | URL | IconDescriptor;

export type Icons = {
  /** <link rel="icon" href="/icon.png" /> */
  icon?: Icon | Icon[];
  /** <link rel="shortcut icon" href="/shortcut-icon.png" /> */
  shortcut?: Icon | Icon[];
  /** <link rel="apple-touch-icon" href="/apple-icon.png" /> */
  apple?: Icon | Icon[];
  /** <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" /> */
  other?: IconDescriptorWithRel | IconDescriptorWithRel[];
};

export type TwitterImageDescriptor = {
  alt?: string;
  /** Twitter deprecated this in 2015. */
  height?: string | number;
  /** Unused, not sure why NextJS has this. */
  secureUrl?: string | URL;
  /** Unused, not sure why NextJS has this. */
  type?: string;
  url: string | URL;
  /** Twitter deprecated this in 2015. */
  width?: string | number;
};

export type TwitterImage = string | TwitterImageDescriptor | URL;

export type TwitterMetadata = {
  /**  <meta name="twitter:creator" content="@nextjs" /> */
  creator?: string;
  /** <meta name="twitter:creator:id" content="1467726470533754880" /> */
  creatorId?: string;
  /**
   * When not specified, uses `description` by default. (Vike doesn't do this)
   * <meta name="twitter:description" content="The React Framework for the Web" />
   */
  description?: string;
  /**
   * Must be absolute URLs.
   *
   * <meta name="twitter:image" content="https://nextjs.org/og.png" />
   */
  images?: TwitterImage | TwitterImage[];
  /** <meta name="twitter:site" content="" /> */
  site?: string;
  /** <meta name="twitter:site:id" content="1467726470533754880" /> */
  siteId?: string;
  /**
   * When not specified, uses `title` by default (Vike doesn't do this).
   * <meta name="twitter:title" content="Next.js" />
   */
  title?: string;
};

export type TwitterPlayerDescriptor = {
  height: number;
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
};

export type TwitterAppDescriptor = {
  id: {
    googleplay?: string;
    ipad?: string | number;
    iphone?: string | number;
  };
  name?: string;
  url?: {
    googleplay?: string | URL;
    ipad?: string | URL;
    iphone?: string | URL;
  };
};

export type Twitter =
  | (TwitterMetadata & {
      /** <meta name="twitter:card" content="summary" />  */
      card: 'summary';
    })
  | (TwitterMetadata & {
      /** <meta name="twitter:card" content="summary_large_image" />  */
      card: 'summary_large_image';
    })
  | (TwitterMetadata & {
      /** <meta name="twitter:card" content="player" />  */
      card: 'player';
      players: TwitterPlayerDescriptor | TwitterPlayerDescriptor[];
    })
  | (TwitterMetadata & {
      app: TwitterAppDescriptor;
      /** <meta name="twitter:card" content="app" />  */
      card: 'app';
    })
  | TwitterMetadata;

export type Author = {
  name?: string;
  url?: string | URL;
};

export type OGAudioDescriptor = {
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
};

export type OGAudio = string | OGAudioDescriptor | URL;

export type OGImageDescriptor = {
  alt?: string;
  height?: string | number;
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
  width?: string | number;
};

export type OGImage = string | OGImageDescriptor | URL;

export type OGVideoDescriptor = {
  height?: string | number;
  secureUrl?: string | URL;
  type?: string;
  url: string | URL;
  width?: string | number;
};

export type OGVideo = string | OGVideoDescriptor | URL;

export type OpenGraphMetadata = {
  alternateLocale?: string | string[];
  audio?: OGAudio | OGAudio[];
  countryName?: string;
  /**
   * When not specified, uses `description` by default. (Vike does this by default)
   * <meta property="og:description" content="The React Framework for the Web" />
   */
  description?: string;
  determiner?: 'a' | 'an' | 'the' | 'auto' | '';
  emails?: string | string[];
  faxNumbers?: string | string[];
  /**
   * <meta property="og:image" content="https://nextjs.org/og.png" />
   * <meta property="og:image:width" content="800" />
   * <meta property="og:image:height" content="600" />
   */
  images?: OGImage | OGImage[];
  /**
   * <meta property="og:locale" content="en_US" />
   */
  locale?: string;
  phoneNumbers?: string | string[];
  siteName?: string;
  /**
   * When not specified, uses `title` by default. (Vike does this by default).
   * <meta property="og:title" content="Next.js" />
   */
  title?: string;
  ttl?: number;
  /**
   * <meta property="og:url" content="https://nextjs.org/" />
   */
  url?: string | URL;
  /**
   * <meta property="og:video" content="https://nextjs.org/video.mp4" />
   * <meta property="og:video:width" content="800" />
   * <meta property="og:video:height" content="600" />
   */
  videos?: OGVideo | OGVideo[];
};

export type OGAlbumOrSong = {
  disc?: number;
  track?: number;
  url: string | URL;
};

export type OGActor = {
  role?: string;
  url: string | URL;
};

export type OpenGraph =
  | (OpenGraphMetadata & {
      /**
       * <meta property="og:type" content="website" />
       */
      type: 'website';
    })
  | (OpenGraphMetadata & {
      authors?: null | string | URL | (string | URL)[];
      expirationTime?: string;
      modifiedTime?: string;
      publishedTime?: string;
      section?: null | string;
      tags?: null | string | string[];
      type: 'article';
    })
  | (OpenGraphMetadata & {
      authors?: null | string | URL | (string | URL)[];
      isbn?: null | string;
      releaseDate?: null | string;
      tags?: null | string | string[];
      type: 'book';
    })
  | (OpenGraphMetadata & {
      firstName?: null | string;
      gender?: null | string;
      lastName?: null | string;
      type: 'profile';
      username?: null | string;
    })
  | (OpenGraphMetadata & {
      albums?: null | string | URL | OGAlbumOrSong | (string | URL | OGAlbumOrSong)[];
      duration?: null | number;
      musicians?: null | string | URL | (string | URL)[];
      type: 'music.song';
    })
  | (OpenGraphMetadata & {
      musicians?: null | string | URL | (string | URL)[];
      releaseDate?: null | string;
      songs?: null | string | URL | OGAlbumOrSong | (string | URL | OGAlbumOrSong)[];
      type: 'music.album';
    })
  | (OpenGraphMetadata & {
      creators?: null | string | URL | (string | URL)[];
      songs?: null | string | URL | OGAlbumOrSong | (string | URL | OGAlbumOrSong)[];
      type: 'music.playlist';
    })
  | (OpenGraphMetadata & {
      creators?: null | string | URL | (string | URL)[];
      type: 'music.radio_station';
    })
  | (OpenGraphMetadata & {
      actors?: null | string | URL | OGActor | (string | URL | OGActor)[];
      directors?: null | string | URL | (string | URL)[];
      duration?: null | number;
      releaseDate?: null | string;
      tags?: null | string | string[];
      type: 'video.movie';
      writers?: null | string | URL | (string | URL)[];
    })
  | (OpenGraphMetadata & {
      actors?: null | string | URL | OGActor | (string | URL | OGActor)[];
      directors?: null | string | URL | (string | URL)[];
      duration?: null | number;
      releaseDate?: null | string;
      series?: null | string | URL;
      tags?: null | string | string[];
      type: 'video.episode';
      writers?: null | string | URL | (string | URL)[];
    })
  | (OpenGraphMetadata & {
      type: 'video.tv_show';
    })
  | (OpenGraphMetadata & {
      type: 'video.other';
    })
  | OpenGraphMetadata;

export type ThemeColorDescriptor = {
  color: string;
  media?: string;
};

export type RobotsInfo = {
  follow?: boolean;
  index?: boolean;
  indexifembedded?: boolean;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
  'max-video-preview'?: number | string;
  noarchive?: boolean;
  nocache?: boolean;
  nofollow?: never;
  noimageindex?: boolean;
  noindex?: never;
  nositelinkssearchbox?: boolean;
  nosnippet?: boolean;
  notranslate?: boolean;
  unavailable_after?: string;
};

/**
 * ⭐️
 */
export type ViewPort = {
  /**
   * The color scheme for the document.
   *
   * @example
   * "dark"
   * <meta name="color-scheme" content="dark" />
   */
  colorScheme?: 'normal' | 'light' | 'dark' | 'light dark' | 'dark light' | 'only light';
  height?: string | number;
  initialScale?: number;
  interactiveWidget?: 'resizes-visual' | 'resizes-content' | 'overlays-content';
  maximumScale?: number;
  minimumScale?: number;
  /**
   * The theme color for the document.
   * @example
   * "#000000"
   * <meta name="theme-color" content="#000000" />
   * { media: "(prefers-color-scheme: dark)", color: "#000000" }
   * <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
   *
   * [
   *  { media: "(prefers-color-scheme: dark)", color: "#000000" },
   *  { media: "(prefers-color-scheme: light)", color: "#ffffff" }
   * ]
   * <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
   * <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
   */
  themeColor?: string | ThemeColorDescriptor | ThemeColorDescriptor[];
  userScalable?: boolean;
  viewportFit?: 'auto' | 'cover' | 'contain';
  width?: string | number;
};
