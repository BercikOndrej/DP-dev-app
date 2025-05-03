import { BindingScope, inject, injectable } from '@loopback/core';
import { Request, Response, RestBindings } from '@loopback/rest';
import fs from 'fs';
import multer from 'multer';
import { default as Path } from 'path';

export interface FileUpload {
  filename: string;
  mime: string;
  origName: string;
  size: number;
  description: string | null;
}

@injectable({ scope: BindingScope.TRANSIENT })
export class FileUploadService {
  constructor(@inject(RestBindings.Http.RESPONSE) public response: Response) {}

  // Upload file
  async processFileUpload(
    request: Request,
    storePath: string,
    filename: string,
    imageOnly = true,
    maxSize: number | null = null,
    allowedMimes: string[] | null = null,
  ): Promise<FileUpload[]> {
    return new Promise<FileUpload[]>((resolve, reject) => {
      const storage = multer.memoryStorage();
      const upload = multer({ storage });

      upload.any()(request, this.response, async (err: unknown) => {
        if (err) {
          reject(err);
          return;
        }
        const uploadedFiles = [] as FileUpload[];

        for (const file of (request as any).files) {
          const fileMime = this.getMimeFromBuffer(file.buffer);

          if (imageOnly && file.mimetype.match(/image\/*/) == null) {
            // throw HttpErrors.BadRequest('Images allowed only');
            reject('Images allowed only');
            return;
          }
          if (maxSize && file.size > maxSize) {
            reject('Wrong file size');
            return;
          }
          if (allowedMimes) {
            let pass = false;
            for (const mime of allowedMimes) {
              if (
                mime === 'image/*' &&
                fileMime.mime.match(/image\/*/) !== null
              ) {
                pass = true;
              } else if (mime === fileMime.mime) {
                pass = true;
              }
            }
            if (!pass) {
              // throw HttpErrors.BadRequest('Not allowed mime type');
              reject('Not allowed mime type');
              return;
            }
          }

          // Creating file name
          const ext = Path.extname(file.originalname);

          // Save file
          if (!fs.existsSync(storePath)) {
            // throw HttpErrors.BadRequest('Error saving file');
            reject('Error during saving file: storePath does not exist');
            return;
          }
          if (fs.existsSync(storePath + filename + ext)) {
            // throw HttpErrors.BadRequest('Error saving file');
            reject('Error during saving file: file already exists');
            return;
          }
          fs.writeFile(storePath + filename + ext, file.buffer, (err) => {
            if (err) {
              // throw HttpErrors.BadRequest('Error saving file');
              reject('Error during saving file');
              return;
            }
          });

          uploadedFiles.push({
            filename: filename + ext,
            mime: file.mimetype,
            origName: file.originalname,
            size: file.size,
            description: request.body.description ?? null,
          } as FileUpload);
        }
        resolve(uploadedFiles);
      });
    });
  }

  // Get true MIME from file
  getMimeFromBuffer(arrayBuffer: Buffer): { mime: string; ext: string } {
    const uint8arr = new Uint8Array(arrayBuffer);

    const len = 4;
    if (uint8arr.length >= len) {
      const sArr = new Array(len);
      for (let i = 0; i < len; i++)
        sArr[i] = new Uint8Array(arrayBuffer)[i].toString(16);

      const signature = sArr.join('').toUpperCase();

      switch (signature) {
        case '89504E47':
          return { mime: 'image/png', ext: 'png' };
        case '47494638':
          return { mime: 'image/gif', ext: 'gif' };
        case '25504446':
          return { mime: 'application/pdf', ext: 'pdf' };
        case 'FFD8FFDB':
          return { mime: 'image/jpeg', ext: 'jpeg' };
        case 'FFD8FFE0':
          return { mime: 'image/jpeg', ext: 'jpeg' };
        case '52494646':
          return { mime: 'image/webp', ext: 'webp' };
        case '504B0304':
          return { mime: 'application/zip', ext: 'jpeg' };
        case 'FFD8FFE1':
          return { mime: 'image/jpeg', ext: 'jpeg' };
        case 'D0CF11E0':
          return { mime: 'application/xls', ext: 'xls' };
        default:
          console.log('Unknown mime signature: ' + signature);
          return { mime: 'unknown', ext: 'unknown' };
      }
    }
    return { mime: 'unknown', ext: 'unknown' };
  }

  async deleteFile(regex: RegExp, sourcePath: string): Promise<void> {
    let rightFile: string | undefined = undefined;
    fs.readdirSync(sourcePath).forEach((file) => {
      if (regex.test(file)) {
        rightFile = file;
      }
    });
    if (rightFile) {
      fs.rmSync(`${sourcePath}${rightFile}`);
    }
  }
}
