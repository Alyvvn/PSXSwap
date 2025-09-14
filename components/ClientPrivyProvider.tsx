"use client";
import { PrivyProvider } from '@privy-io/react-auth';

export default function ClientPrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId="cmdy67mbc00b4ky0bltwevovl">
      {children}
    </PrivyProvider>
  );
}