import type { NextPage } from 'next';
import { useContext, useState } from 'react';
import { MessageTypes } from 'hashconnect';
import Button from '../components/global/Button';
import { HashConnectContext } from '../context/HashConnectWrapper';

const Tester: NextPage = function () {

  const [clicked, setClicked] = useState<Boolean>(false);
  const [hashconnect, initHashConnect] = useContext(HashConnectContext);

  const HG_BASEURI =
  'https://hashguild.xyz/api/' 

  const buttonClicked = async () => {

    try {
        let hc = hashconnect;
        if (!hc) {
          [hc] = await initHashConnect();
        }

        hc!.connectToLocalWallet();
      

        hc!.pairingEvent.once(async (pairingData) => {
            try {
                const result = await fetch(`${HG_BASEURI}v1/buy/hashpack`, {
                    method: 'POST',
                    body: JSON.stringify({
                        accountId: '0.0.635713', // account id of the user who is buying
                        tokenId: '0.0.813126', // token id of NFT to buy
                        serialNo: 50, // serial number of the NFT to buy
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer <your code>' // insert bearer here
                    },
                  })
            
                  if (!result.ok) {
                    throw new Error(
                      'Something went wrong while fetching the transaction record.'
                    );
                  }
                   
                  const signingData = await result.json();
                  const transactionsByteBuffer = Buffer.from(
                    signingData.byteArray,
                    'base64'
                  );
                  const transactionInByteArray = new Uint8Array(
                    transactionsByteBuffer
                  );
                  const transaction: MessageTypes.Transaction = {
                    topic: pairingData.topic,
                    byteArray: transactionInByteArray,
                    metadata: {
                      accountToSign: pairingData.accountIds[0],
                      returnTransaction: false,
                    },
                  };
                  const res = await hc!.sendTransaction(
                    pairingData.topic,
                    transaction
                  );
                  console.log('TRANSACTION RESULT:', res);
            
            
            }
            catch(error) {
                console.log('ERROR Catched: ', error);
            }})

    
    }
    catch (err) {
        console.log(err)
    }
    setClicked(true)

    
  }


  return (
    <div>
      <p className="text-3xl font-semibold">Welcome Creator!</p>

      <p className="text-md mt-3 mb-11">
        Thank you for choosing HashGuild! We will guide you through the minting
        process. 
        <br />To get started, select one of the options below!
      </p>
      <p className="text-md font-bold mb-9">What would you like to create?</p>

{ !clicked &&  <Button className=' bg-white  hover:bg-black'  title='Test it now' onClick={() => buttonClicked()}/>}
     
     </div>
  );
};

export default Tester;
