import React, { useState } from 'react';
import CopyIcon from '../../public/svg/CopyIcon';
import classNames from '../../utils/classNames';
import Button from '../global/Button';

const AttachWalletSection = function () {
  const [currentOption, setCurrentOption] = useState(1);
  const [copied, setCopied] = useState(false);
  const pairingString = 'eyJtZXRhZGF0YSI6eyJuYW1lIjoiSGFAW2....';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pairingString);
    setCopied(true);
  };
  return (
    <>
      <h1 className="text-lg font-semibold text-center">Connect your Wallet</h1>
      <p className="mt-2 text-sm text-center">
        Please connect your HashPack Wallet to finish your mint.
      </p>
      <div className="flex  justify-between  mt-4 mb-8 gap-x-1 text-xs whitespace-nowrap">
        <Button
          title="Connect per Click"
          onClick={() => setCurrentOption(1)}
          className={classNames(
            '!p-0 !text-left !px-0',
            currentOption === 1 ? 'border-b border-black' : '',
          )}
        />
        <Button
          title="Connect per Pairing String"
          onClick={() => setCurrentOption(2)}
          className={classNames(
            '!p-0 !text-left !px-0',
            currentOption === 2 ? 'border-b border-black' : '',
          )}
        />
      </div>
      {currentOption === 1 && (
        <div className="flex flex-col font-normal text-sm text-slate-500   gap-y-4">
          <p>
            1. Step: <strong>Open HashPack chrome extension</strong>
          </p>
          <p>
            2. Step: <strong>Click Sign up with Hashpack</strong>
          </p>
          <Button
            title="Signup/ Login with HashPack"
            onClick={() => console.log('hook')}
            className="w-full bg-black text-white rounded-lg"
          />
          <p>
            3. Step:{' '}
            <strong>
              3. Step: Select your wallet and click &quot;Approve&quot;
            </strong>
          </p>
        </div>
      )}
      {currentOption === 2 && (
        <div className="flex flex-col font-normal text-sm text-slate-500   gap-y-4">
          <p>
            1. Step: <strong> Copy the Pairing String below</strong>
          </p>
          <div
            className={classNames(
              'flex gap-x-2 w-full py-2 px-3 border rounded-md items-center',
              copied ? 'bg-slate-200' : '',
            )}
          >
            <p className="w-8/10 truncate">{pairingString}</p>
            <CopyIcon onClick={copyToClipboard} />
          </div>
          <p>
            2. Step:{' '}
            <strong>
              Open up HashPack and click the globe icon (🌐 ). Click
              &quot;Connect DApp&quot; and insert the Pairing String.
            </strong>
          </p>
          <Button
            title="Signup/ Login with HashPack"
            onClick={() => console.log('hook')}
            className="w-full bg-black text-white rounded-lg"
          />
          <p>
            3. Step:{' '}
            <strong>
              3. Step: Select your wallet and click &quot;Approve&quot;
            </strong>
          </p>
        </div>
      )}
    </>
  );
};

export default AttachWalletSection;
