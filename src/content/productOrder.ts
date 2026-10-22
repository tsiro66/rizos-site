/** Product category display order: white cheeses, butters, hard cheeses, yogurts, ice creams. */
const categoryOrder = ['white', 'butter', 'hard', 'yogurt', 'icecream'] as const;

export type ProductCategory = (typeof categoryOrder)[number];

export function categoryRank(category: unknown): number {
  const i = categoryOrder.indexOf(category as ProductCategory);
  return i === -1 ? categoryOrder.length : i;
}

/** Sort product entries by category order, then locale name. */
export function sortProducts<T extends { data: Record<string, any> }>(items: T[], locale: string): T[] {
  return [...items].sort((a, b) => {
    const byCategory = categoryRank(a.data.category) - categoryRank(b.data.category);
    if (byCategory !== 0) return byCategory;
    const an = a.data?.[locale]?.name ?? '';
    const bn = b.data?.[locale]?.name ?? '';
    return an.localeCompare(bn, locale === 'el' ? 'el' : 'en');
  });
}
