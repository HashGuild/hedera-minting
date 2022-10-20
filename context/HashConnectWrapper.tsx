import { HashConnect, HashConnectTypes } from 'hashconnect';
import { createContext, useMemo, useState } from 'react';
import initialiseHashConnect from '../utils/hashconnect';

type IHashConnectContext = [
  HashConnect | null,
  (() => Promise<[HashConnect, HashConnectTypes.InitilizationData]>) | null,
  HashConnectTypes.InitilizationData | null
];

export const HashConnectContext = createContext<IHashConnectContext>([
  null,
  null,
  null,
]);

export function HashConnectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hashConnect, setHashConnect] = useState<HashConnect | null>(null);
  const [hcInitData, setHcInitData] = useState<any>(null);

  async function initHashConnect(): Promise<
    [HashConnect, HashConnectTypes.InitilizationData]
  > {
    const [hashconnect, initData] = await initialiseHashConnect();
    setHashConnect(hashconnect);
    setHcInitData(initData);
    return [hashconnect, initData];
  }
  const value = useMemo<IHashConnectContext>(
    () => [hashConnect, initHashConnect, hcInitData],
    [hashConnect, hcInitData]
  );

  return (
    <HashConnectContext.Provider value={value}>
      {children}
    </HashConnectContext.Provider>
  );
}
