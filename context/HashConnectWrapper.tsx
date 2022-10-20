import { HashConnect } from 'hashconnect';
import { createContext, useMemo, useState } from 'react';
import initialiseHashConnect from '../utils/hashconnect';

type IHashConnectContext = [
  HashConnect | null,
  (() => Promise<HashConnect>) | null
];

export const HashConnectContext = createContext<IHashConnectContext>([
  null,
  null,
]);

export function HashConnectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hashConnect, setHashConnect] = useState<HashConnect | null>(null);

  async function initHashConnect() {
    const hashconnect = await initialiseHashConnect();
    setHashConnect(hashconnect);
    return hashconnect;
  }
  const value = useMemo<IHashConnectContext>(
    () => [hashConnect, initHashConnect],
    [hashConnect]
  );

  return (
    <HashConnectContext.Provider value={value}>
      {children}
    </HashConnectContext.Provider>
  );
}
