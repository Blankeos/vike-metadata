import { UseMetadataParams } from './types';

export function parseFormatDetection(value: UseMetadataParams['formatDetection']) {
  if (!value) return undefined;

  let content = '';

  if (typeof value?.email !== 'undefined') {
    if (value.email) content += 'email=yes,';
    else content += 'email=no,';
  }

  if (typeof value?.telephone !== 'undefined') {
    if (value.telephone) content += 'telephone=yes,';
    else content += 'telephone=no,';
  }

  if (typeof value?.address !== 'undefined') {
    if (value.address) content += 'address=yes,';
    else content += 'address=no,';
  }

  if (typeof value?.url !== 'undefined') {
    if (value.url) content += 'url=yes,';
    else content += 'url=no,';
  }

  if (typeof value?.date !== 'undefined') {
    if (value.date) content += 'date=yes';
    else content += 'date=no';
  }

  return content;
}

export function parseRobotsInfo(value: UseMetadataParams['robots'] | string) {
  if (!value) return null;
  if (typeof value === 'string') return value;

  const content = [];

  if (value?.follow !== undefined || value?.nofollow !== undefined) {
    if (value.follow === true || value.nofollow === false) content.push('follow');
    else content.push('nofollow');
  }

  if (value?.index !== undefined || value?.noindex !== undefined) {
    if (value.index === true || value.noindex === false) content.push('index');
    else content.push('noindex');
  }

  if (value?.indexifembedded === true) {
    content.push('indexifembedded');
  }

  if (value?.['max-image-preview'] !== undefined) {
    content.push(`max-image-preview:${value['max-image-preview']}`);
  }

  if (value?.['max-snippet'] !== undefined) {
    content.push(`max-snippet:${value['max-snippet']}`);
  }

  if (value?.['max-video-preview'] !== undefined) {
    content.push(`max-video-preview:${value['max-video-preview']}`);
  }

  if (value?.noarchive === true) {
    content.push('noarchive');
  }

  if (value?.nocache === true) {
    content.push('nocache');
  }

  if (value?.noimageindex === true) {
    content.push('noimageindex');
  }

  if (value?.nositelinkssearchbox === true) {
    content.push('nositelinkssearchbox');
  }

  if (value?.nosnippet === true) {
    content.push('nosnippet');
  }

  if (value?.notranslate === true) {
    content.push('notranslate');
  }

  if (value?.unavailable_after !== undefined) {
    content.push(`unavailable_after: ${value.unavailable_after}`);
  }

  return content.join(', ');
}

export function parseViewport(value: UseMetadataParams['viewport']) {
  if (!value) return null;

  const content = [];

  if (value.width !== undefined) {
    content.push(`width=${value.width}`);
  }

  if (value.height !== undefined) {
    content.push(`height=${value.height}`);
  }

  if (value.initialScale !== undefined) {
    content.push(`initial-scale=${value.initialScale}`);
  }

  if (value.interactiveWidget !== undefined) {
    content.push(`interactive-widget=${value.interactiveWidget}`);
  }

  if (value.maximumScale !== undefined) {
    content.push(`maximum-scale=${value.maximumScale}`);
  }

  if (value.minimumScale !== undefined) {
    content.push(`minimum-scale=${value.minimumScale}`);
  }

  if (value.userScalable !== undefined) {
    if (value.userScalable === true) content.push('user-scalable=yes');
    content.push('user-scalable=no');
  }

  if (value.viewportFit !== undefined) {
    content.push(`viewport-fit=${value.viewportFit}`);
  }

  return content.join(', ');
}

/** Used by keywords. */
export function parseKeywords(value: string | string[]) {
  if (typeof value === 'string') {
    return value;
  }
  return value.join(',');
}
