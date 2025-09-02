import { defineConfig } from 'unocss'

export default defineConfig({
  // 启用伪元素和其他变体
  variants: [
    // 默认变体
    (matcher) => {
      if (!matcher.startsWith('before:') && !matcher.startsWith('after:'))
        return matcher

      return {
        matcher: matcher.slice(matcher.indexOf(':') + 1),
        selector: s => `${s}::${matcher.startsWith('before:') ? 'before' : 'after'}`,
      }
    },
  ],
  // 安全列表，确保这些类被包含
  safelist: [
    'before:content-[\'\']',
    'before:block',
    'before:w-2.5',
    'before:h-2.5',
    'before:absolute',
    'before:top-4',
    'before:transform',
    'before:rotate-45',
    'before:rounded-tl',
    'before:bg-white',
    'before:bg-[#95ec69]',
    'before:-right-1',
    'before:-left-1',
    'before:-mt-1',
  ],
})
