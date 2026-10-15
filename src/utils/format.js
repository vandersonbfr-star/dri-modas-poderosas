export const money = (value) => new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(value);
export const WHATSAPP_URL = 'https://wa.me/5521983470644';
export const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Dri Modas Poderosas e gostaria de ajuda.';
export function whatsappLink(message = DEFAULT_MESSAGE) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
