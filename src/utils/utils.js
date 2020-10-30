export function px2rem(px) {
  let radio = 375 / 10;
  return px / radio;
}
export function realPx(px) {
  let maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth;
  return px * (maxWidth / 375);
}
