"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
let FileUploadService = class FileUploadService {
    constructor(response) {
        this.response = response;
    }
    // Upload file
    async processFileUpload(request, storePath, filename, imageOnly = true, maxSize = null, allowedMimes = null) {
        return new Promise((resolve, reject) => {
            const storage = multer_1.default.memoryStorage();
            const upload = (0, multer_1.default)({ storage });
            upload.any()(request, this.response, async (err) => {
                var _a;
                if (err) {
                    reject(err);
                    return;
                }
                const uploadedFiles = [];
                for (const file of request.files) {
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
                            if (mime === 'image/*' &&
                                fileMime.mime.match(/image\/*/) !== null) {
                                pass = true;
                            }
                            else if (mime === fileMime.mime) {
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
                    const ext = path_1.default.extname(file.originalname);
                    // Save file
                    if (!fs_1.default.existsSync(storePath)) {
                        // throw HttpErrors.BadRequest('Error saving file');
                        reject('Error during saving file: storePath does not exist');
                        return;
                    }
                    if (fs_1.default.existsSync(storePath + filename + ext)) {
                        // throw HttpErrors.BadRequest('Error saving file');
                        reject('Error during saving file: file already exists');
                        return;
                    }
                    fs_1.default.writeFile(storePath + filename + ext, file.buffer, (err) => {
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
                        description: (_a = request.body.description) !== null && _a !== void 0 ? _a : null,
                    });
                }
                resolve(uploadedFiles);
            });
        });
    }
    // Get true MIME from file
    getMimeFromBuffer(arrayBuffer) {
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
    async deleteFile(regex, sourcePath) {
        let rightFile = undefined;
        fs_1.default.readdirSync(sourcePath).forEach((file) => {
            if (regex.test(file)) {
                rightFile = file;
            }
        });
        if (rightFile) {
            fs_1.default.rmSync(`${sourcePath}${rightFile}`);
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map