/** 获取文字中链接地址 */
export function httpString(s: string) {
  const reg =
    /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  return (s.match(reg) || "").toString();
}
