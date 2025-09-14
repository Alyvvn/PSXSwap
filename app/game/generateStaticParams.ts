export async function generateStaticParams() {
  // This ensures the game page is pre-rendered at build time
  return [{ slug: [''] }];
}

export const dynamicParams = false; // Only use statically generated pages
