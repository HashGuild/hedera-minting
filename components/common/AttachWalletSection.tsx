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
  const [waitingForTransaction, setWaitingForTransaction] = useState(false);
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
    setWaitingForTransaction(true)
  }

  useEffect(() => {
    if (!hashconnect || !initData) {
      initHashConnect!().catch((err) => console.log(err))
      return
    }
    setPairingString(initData.pairingString);
  }, [initHashConnect, hashconnect, initData]);



  if (waitingForTransaction) return (
    <>
    <h1 className="text-lg font-semibold text-center">Waiting for your Transaction</h1><p className="mt-2 text-sm text-center">
     Please wait while files are pinned to IPFS - the protocol designed to preserve and grow humanity&apos;s knowledge.
    </p>
    <div className="flex flex-col font-normal text-sm text-slate-500 gap-y-4">
    <div className="flex flex-col text-center gap-5 my-5">
      <div>
    <svg className="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>

    <span className="sr-only">Loading...</span>
    </div>

        <p>
        <strong>Please accept the Authentication Request.</strong>
        </p>
        <p>
        <strong>Please accept the Smart Contract Execution Request.</strong>
        </p>
      </div>
      </div>
      </>
  )

  return (
    <>
      <h1 className="text-lg font-semibold text-center">Connect your Wallet</h1>
      <p className="mt-2 text-sm text-center">
        Please connect your HashPack Wallet to finish your mint.
      </p>
      <div className="flex flex-col sm:flex-row mt-8 mb-8 gap-x-2 sm:gap-x-7 text-base whitespace-nowrap">
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
