/// <reference types="express" />
/// <reference types="node" />
/// <reference types="node" />
import { Request, Response } from '@loopback/rest';
export interface FileUpload {
    filename: string;
    mime: string;
    origName: string;
    size: number;
    description: string | null;
}
export declare class FileUploadService {
    response: Response;
    constructor(response: Response);
    processFileUpload(request: Request, storePath: string, filename: string, imageOnly?: boolean, maxSize?: number | null, allowedMimes?: string[] | null): Promise<FileUpload[]>;
    getMimeFromBuffer(arrayBuffer: Buffer): {
        mime: string;
        ext: string;
    };
    deleteFile(regex: RegExp, sourcePath: string): Promise<void>;
}
