// >>> Utilities for Client-Side (Vanilla friendly)

import type { Icon, IconDescriptorWithRel, Icons } from './types';

const ICONS_DATA_ATTRIBUTE = 'data-vike-metadata-icons';

export function createIfNotExistsMetaName(name: string, value: any) {
  let metaElement = document.querySelector(`meta[name="${name}"]`);
  if (!metaElement) {
    metaElement = document.createElement('meta');
    metaElement.setAttribute('name', name);
    document.head.appendChild(metaElement);
  }
  metaElement.setAttribute('content', value);
}

export function createIfNotExistsMetaProperty(property: string, value: any) {
  let metaElement = document.querySelector(`meta[property="${property}"]`);
  if (!metaElement) {
    metaElement = document.createElement('meta');
    metaElement.setAttribute('property', property);
    document.head.appendChild(metaElement);
  }
  metaElement.setAttribute('content', value);
}

export function updateIconsMetadata(value?: Icons) {
  if (!value) return;

  document
    .head
    .querySelectorAll(`link[${ICONS_DATA_ATTRIBUTE}]`)
    .forEach((element) => element.remove());

  normalizeArray(value.icon).forEach((item) => {
    const link = createIconLink('icon', item);
    if (link) appendIconLink(link);
  });
  normalizeArray(value.shortcut).forEach((item) => {
    const link = createIconLink('shortcut icon', item);
    if (link) appendIconLink(link);
  });
  normalizeArray(value.apple).forEach((item) => {
    const link = createIconLink('apple-touch-icon', item);
    if (link) appendIconLink(link);
  });
  normalizeArray(value.other).forEach((item) => {
    const link = createOtherIconLink(item);
    if (link) appendIconLink(link);
  });
}

function normalizeArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function appendIconLink(link: HTMLLinkElement) {
  link.setAttribute(ICONS_DATA_ATTRIBUTE, '');
  document.head.appendChild(link);
}

function createIconLink(rel: string, item: Icon) {
  const link = document.createElement('link');
  link.rel = rel;

  if (typeof item === 'string' || item instanceof URL) {
    link.href = item.toString();
    return link;
  }

  if (!item?.url) return null;

  link.href = item.url.toString();
  if (item.sizes) link.setAttribute('sizes', item.sizes);
  if (item.type) link.setAttribute('type', item.type);
  if (item.media) link.setAttribute('media', item.media);

  return link;
}

function createOtherIconLink(item: IconDescriptorWithRel) {
  if (!item?.url) return null;

  const link = document.createElement('link');
  link.rel = item.rel;
  link.href = item.url.toString();
  if (item.sizes) link.setAttribute('sizes', item.sizes);
  if (item.type) link.setAttribute('type', item.type);
  if (item.media) link.setAttribute('media', item.media);

  return link;
}
