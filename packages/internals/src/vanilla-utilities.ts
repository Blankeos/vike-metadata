// >>> Utilities for Client-Side (Vanilla friendly)

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
