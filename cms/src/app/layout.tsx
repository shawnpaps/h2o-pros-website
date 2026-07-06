import type { ReactNode } from 'react';
import configPromise from '@payload-config';
import { handleServerFunctions, RootLayout as PayloadRootLayout } from '@payloadcms/next/layouts';
import { importMap } from './(payload)/admin/importMap';

export const metadata = {
  title: 'H2O Pros CMS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const serverFunction = (args: { args: Record<string, unknown>; name: string }) =>
    handleServerFunctions({
      ...args,
      config: configPromise,
      importMap,
    });

  return PayloadRootLayout({
    children,
    config: configPromise,
    htmlProps: { lang: 'en' },
    importMap,
    serverFunction,
  });
}
