import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

type ResponseData = {
  success: boolean;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: '/tmp',
    filename: (_, file, cb) => cb(null, file.originalname),
  }),
});
const uploadMiddleware = upload.array('files');

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
});
apiRoute.use(uploadMiddleware);

apiRoute.post<NextApiRequest, NextApiResponse<ResponseData>>(async (_, res) => {
  // const client = new NFTStorage({ token: '' });
  // const storageResponse = await client.store({});
  res.status(200).json({ success: true });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
