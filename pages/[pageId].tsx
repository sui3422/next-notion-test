import * as React from 'react';

import { ExtendedRecordMap } from 'notion-types';
import { getAllPagesInSpace } from 'notion-utils';
import { defaultMapPageUrl } from 'react-notion-x';

import * as notion from '../lib/notion';
import { NotionPage } from '../components/NotionPage';
import {
  isDev,
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
  rootNotionSpaceId,
} from '../lib/config';

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const mapPageUrl = defaultMapPageUrl(rootNotionPageId);

  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage,
    {
      traverseCollections: false,
    }
  );

  const paths = Object.keys(pages)
    .map((pageId) => mapPageUrl(pageId))
    .filter((path) => path && path !== '/');

  return {
    paths,
    fallback: true,
  };
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
    />
  );
}
