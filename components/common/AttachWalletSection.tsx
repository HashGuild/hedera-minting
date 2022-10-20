import React, { useContext, useEffect, useState } from 'react';
import { HashConnectContext } from '../../context/HashConnectWrapper';
import CopyIcon from '../../public/svg/CopyIcon';
import classNames from '../../utils/classNames';
import Button from '../global/Button';


interface AttachWalletSectionProps {
  onPairingEvent: () => void; 
}


const AttachWalletSection = function ({onPairingEvent}: AttachWalletSectionProps) {
  const [currentOption, setCurrentOption] = useState(1);
  const [copied, setCopied] = useState(false);
  const [hashconnect, initHashConnect, initData] =
    useContext(HashConnectContext);
  const [pairingString, setPairingString] = useState<string | null>(null);

  const copyToClipboard = () => {
    if (pairingString) {
      navigator.clipboard.writeText(pairingString);
      setCopied(true);
    }
  };

  function connectToWallet() {
    onPairingEvent();
  }

  useEffect(() => {
    if (!hashconnect || !initData) {
      initHashConnect!().catch((err) => console.log(err))
      return
    }
    setPairingString(initData.pairingString);
  }, [initHashConnect, hashconnect, initData]);

  return (
    <>
      <h1 className="text-lg font-semibold text-center">Connect your Wallet</h1>
      <p className="mt-2 text-sm text-center">
        Please connect your HashPack Wallet to finish your mint.
      </p>
      <div className="flex mt-8 mb-8 gap-x-7 text-base whitespace-nowrap">
        <Button
          title="Connect via Click"
          onClick={() => setCurrentOption(1)}
          className={classNames(
            '!p-0 !text-left !px-0',
            currentOption === 1 ? 'border-b border-black' : ''
          )}
        />
        <Button
          title="Connect via Pairing String"
          onClick={() => setCurrentOption(2)}
          className={classNames(
            '!p-0 !text-left !px-0',
            currentOption === 2 ? 'border-b border-black' : ''
          )}
        />
      </div>
      {currentOption === 1 && (
        <div className="flex flex-col font-normal text-sm text-slate-500 gap-y-4">
          <p className='mb-4'>
          This is the preferred option on Desktop.
          </p>
          <p>
            1. Step: <strong>Open HashPack chrome extension</strong>
          </p>
          <p>
            2. Step: <strong>Click Mint with HashPack</strong>
          </p>
          <Button
            title="Mint with HashPack"
            onClick={() => connectToWallet()}
            className="w-full bg-black text-white rounded-lg"
          />
          <p>
            3. Step:{' '}
            <strong>Select your wallet and click &quot;Approve&quot;</strong>
          </p>
          <p>
            4. Step:{' '}
            <strong>Confirm Smart Contract Execution Event</strong>
          </p>
        </div>
      )}
      {currentOption === 2 && (
        <div className="flex flex-col font-normal text-sm text-slate-500 gap-y-4">
           <p className='mb-4'>
           This is the preferred option for mobile devices.
          </p>
          <p>
            1. Step: <strong> Copy the Pairing String below</strong>
          </p>
          <div
            className={classNames(
              'flex gap-x-2 w-full py-2 px-3 border rounded-md items-center',
              copied ? 'bg-slate-200' : ''
            )}
          >
            <p className="w-8/10 truncate">{pairingString}</p>
            <CopyIcon className="dark:stroke-white dark:fill-white" onClick={copyToClipboard} />
          </div>
          <p>
            2. Step:{' '}
            <strong>
              Open up HashPack and click the globe icon (🌐 ). Click
              &quot;Connect DApp&quot; and insert the Pairing String.
            </strong>
          </p>
          <Button
            title="Mint with HashPack"
            onClick={() => connectToWallet}
            className="w-full bg-black text-white rounded-lg"
          />
          <p>
            3. Step:{' '}
            <strong>Select your wallet and click &quot;Approve&quot;</strong>
          </p>
          <p>
            4. Step:{' '}
            <strong>Confirm Smart Contract Execution Event</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default AttachWalletSection;
