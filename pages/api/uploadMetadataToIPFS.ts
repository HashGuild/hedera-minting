import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import { Blob, NFTStorage } from 'nft.storage';
import fs from 'fs/promises';

type ResponseData = {
  success: boolean;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: '/tmp',
    filename: (_, file, cb) => cb(null, file.originalname),
  }),
});
const uploadMiddleware = upload.fields([
  { name: 'files', maxCount: 5 },
  { name: 'thumbnailFile', maxCount: 1 },
]);

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
});
apiRoute.use(uploadMiddleware);

apiRoute.post<NextApiRequest & { files: any }, NextApiResponse<ResponseData>>(
  async (req, res) => {
    const client = new NFTStorage({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBDNkNmOTc3NzRkNmQyMTdkOWVCNzVCOWUzMjgyNEZBZjBENDY0NGMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTc3OTA2MzE4OCwibmFtZSI6IkRldiJ9.hmSDCTY_2ksbbZnDpSFLy5H-guxJk9fWMktCIYpaO98',
    });

    const { name, description, creator, attributes } = req.body;
    const token: Record<string, any> = {};

    // Store thumbnail
    const thumbnailData = req.files.thumbnailFile[0];
    const buffer = await fs.readFile(thumbnailData.path);
    const image = new Blob([buffer]);
    const { cid: thumbnailCid, car: thumbnailCar } =
      await NFTStorage.encodeBlob(image);
    await client.storeCar(thumbnailCar);
    token.image = `ipfs://${thumbnailCid}`;

    // Store images
    token.files = await Promise.all(
      req.files.files.map(async (file: any) => {
        const fileBuffer = await fs.readFile(file.path);
        const fileBlob = new Blob([fileBuffer]);
        const { cid: fileCid, car: fileCar } = await NFTStorage.encodeBlob(
          fileBlob
        );
        await client.storeCar(fileCar);
        return {
          uri: `ipfs://${fileCid}`,
          type: file.mimetype,
        };
      })
    );

    // Set attributes
    if (attributes) {
      const parsedAttributes = JSON.parse(attributes);
      if (Array.isArray(parsedAttributes)) {
        token.attributes = [];

        for (const attribute of parsedAttributes) {
          token.attributes.push({
            trait_type: attribute.key,
            value: attribute.value,
          });
        }
      }
    }

    // Set general properties
    token.name = name;
    token.description = description;
    token.creator = creator;
    token.type = thumbnailData.mimetype;

    const tokenBlob = new Blob([JSON.stringify(token)]);
    const { cid, car } = await NFTStorage.encodeBlob(tokenBlob);

    await client.storeCar(car);
    res.status(200).json({ success: true, url: `ipfs://${cid}` });
  }
);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
