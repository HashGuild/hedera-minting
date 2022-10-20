import React, { useState } from 'react';
import CreateIcon from '../../public/svg/CreateIcon';
import DeleteIcon from '../../public/svg/DeleteIcon';
import EditIcon from '../../public/svg/EditIcon';
import Tooltip from '../common/Tooltip';

type NFTCardProps = {
  image?: string;
  nftName?: string;
  collectionName?: string;
  emptyCard?: boolean;
  createNft?: () => void;
  deleteNft?: () => void;
  editNft?: () => void;
};

const NFTCard = function ({
  nftName,
  collectionName,
  image = '',
  emptyCard = false,
  createNft = () => {},
  deleteNft = () => {},
  editNft = () => {},
}: NFTCardProps) {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      {emptyCard ? (
        <div
          role="presentation"
          onClick={createNft}
          className="max-h-[14rem] min-h-[14rem] md:max-h-[16rem] md:min-h-[16rem]  flex flex-col items-center justify-between py-14  transition-all hover:-translate-y-2  cursor-pointer border shadow-lg rounded-md h-full"
        >
          <CreateIcon />
          <p className="text-base  text-gray-400">Create NFT</p>
        </div>
      ) : (
        <div className="text-xs font-semibold border shadow-lg rounded-md relative">
          <div className="absolute right-2 top-2 bg-gray-200 hover:bg-opacity-80 h-7 w-7 cursor-pointer rounded-full flex items-center justify-center">
            <Tooltip
              onOpen={() => setShowContent(true)}
              onClose={() => setShowContent(false)}
              showContent={showContent}
              right={false}
              TooltipIcon={
                <DeleteIcon className="cursor-pointer z-10 stroke-transparent " />
              }
            >
              <section className="text-xs whitespace-nowrap bg-white">
                <p className="pb-1 border-b p-3 border-black font-semibold">
                  Are you sure?
                </p>
                <div className="p-3 space-y-3">
                  <p
                    role="presentation"
                    className="font-semibold text-red-600 cursor-pointer"
                    onClick={deleteNft}
                  >
                    Delete File
                  </p>
                  <p
                    role="presentation"
                    className="font-semibold cursor-pointer"
                    onClick={() => setShowContent(false)}
                  >
                    Abort
                  </p>
                </div>
              </section>
            </Tooltip>
          </div>
          <picture>
            <source src={image} type="image/webp" />
            <img
              className="max-h-[9rem] min-h-[9rem] md:max-h-[11rem] md:min-h-[11rem] w-full rounded-t-md"
              src={image}
              alt="nft"
            />
          </picture>
          <div className="flex justify-between items-center text-lg p-2">
            <p className="truncate">{nftName}</p>
            <EditIcon
              onClick={editNft}
              className="cursor-pointer hover:opacity-80"
            />
          </div>
          <p className="truncate text-sm px-2 pb-5 text-gray-500">{collectionName}</p>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
