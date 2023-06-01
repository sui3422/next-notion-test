export const rootNotionPageId = 'ca761181f3ab4856bebbdaefd165c067';
export const rootNotionSpaceId = 'fde5ac74-eea3-4527-8f00-4482710e1af3';
export const previewImagesEnabled = true;
export const useOfficialNotionAPI =
  false ||
  (process.env.USE_OFFICIAL_NOTION_API === 'true' && process.env.NOTION_TOKEN);

export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

export const port = process.env.PORT || 3000;
export const rootDomain = isDev ? `localhost:${port}` : null;
