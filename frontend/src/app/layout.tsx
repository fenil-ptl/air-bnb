import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '@/components/boundaries/error-boundary';
import { LoadingBoundary } from '@/components/boundaries/loading-boundary';
import { RootProvider } from '@/providers/root-provider';

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <ErrorBoundary>
            <LoadingBoundary>{children}</LoadingBoundary>
          </ErrorBoundary>
        </RootProvider>
      </body>
    </html>
  );
}
