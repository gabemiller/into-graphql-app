export const className = (...classList: (string | false)[]): string => {
  return classList.filter(Boolean).join(' ')
}
