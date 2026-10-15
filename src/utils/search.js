/** Normaliza texto para busca sem diferenciar caixa ou acentos. */
export function normalizeSearchText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export function productSearchText(product) {
  return [
    product?.name,
    product?.category,
    product?.description,
    ...(Array.isArray(product?.colors) ? product.colors.map(color => color?.name) : []),
    ...(Array.isArray(product?.details) ? product.details : []),
    ...(Array.isArray(product?.sizes) ? product.sizes : []),
    ...(Array.isArray(product?.tags) ? product.tags : []),
    product?.tag,
  ].filter(Boolean).join(' ');
}

export function searchProducts(products, query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [...products];
  const terms = normalized.split(/\s+/).filter(Boolean);
  return products.filter(product => {
    const text = normalizeSearchText(productSearchText(product));
    return terms.every(term => text.includes(term));
  });
}

export function filterProducts(products, filters = {}) {
  const { category = '', size = '', color = '', minPrice = '', maxPrice = '' } = filters;
  const min = minPrice === '' ? null : Number(minPrice);
  const max = maxPrice === '' ? null : Number(maxPrice);
  return products.filter(product => {
    if (category && product.category !== category) return false;
    if (size && !(product.sizes || []).includes(size)) return false;
    if (color && !(product.colors || []).some(item => item.name === color)) return false;
    if (min !== null && Number.isFinite(min) && (!Number.isFinite(product.price) || product.price < min)) return false;
    if (max !== null && Number.isFinite(max) && (!Number.isFinite(product.price) || product.price > max)) return false;
    return true;
  });
}

export function sortProducts(products, sort = 'featured') {
  const result = [...products];
  switch (sort) {
    case 'price-asc': return result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    case 'price-desc': return result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    case 'name-asc': return result.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR'));
    case 'name-desc': return result.sort((a, b) => String(b.name || '').localeCompare(String(a.name || ''), 'pt-BR'));
    case 'newest': {
      if (!result.every(p => p.createdAt && Number.isFinite(Date.parse(p.createdAt)))) return result;
      return result.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }
    default: return result;
  }
}
