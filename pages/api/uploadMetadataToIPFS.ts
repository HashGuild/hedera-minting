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

    const { name, description } = req.body;
    const buffer = await fs.readFile(req.files.files[0].path);
    const image = new Blob([buffer]);
    const storageResponse = await client.store({
      name,
      description,
      image,
    });
    res.status(200).json({ success: true, url: storageResponse.url });
  }
);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
