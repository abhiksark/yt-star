function getCanonicalUrl(url) {
  if (url === '/') return url;
  return url.endsWith('/') ? url : url + '/';
}

const canonicalUrl = baseUrl + getCanonicalUrl(creatorPath); 