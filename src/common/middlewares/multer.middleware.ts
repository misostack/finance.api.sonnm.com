import { Environment } from '@modules/config/environment';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

const getMyStorage = (destination = './public/data/uploads') => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.originalname}`);
    },
  });
};

const getMyFileFilter = function (req, file, cb) {
  const allowedMimes = Environment.getConfigValues().SUPPORT_FILE_TYPES;
  if (!allowedMimes || allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        code: 'invalid_file_type',
        message: `Invalid file type. Only ${allowedMimes.join(
          ', ',
        )} files are allowed.`,
      },
      true,
    );
  }
};

const MulterMiddleware = (
  multerOptions: MulterOptions,
  fieldName = 'file',
  single = true,
) => {
  const upload = multer({
    storage: getMyStorage(multerOptions.dest),
    fileFilter: getMyFileFilter,
    ...multerOptions,
  });
  return single ? upload.single(fieldName) : upload.array(fieldName);
};

export default MulterMiddleware;
