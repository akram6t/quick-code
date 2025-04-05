
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Readable } from 'stream';

/*
// Tebi.io S3 credentials
const credentials = {
  accessKeyId: "1gEWvkg8w7tensLm", // Replace with your access key
  secretAccessKey: "yiIw6zCDiNkgPMzmz47bLoOxIwUqFeGTJoaEMb4v", // Replace with your secret key
};

// Initialize S3 client
const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io", // Tebi.io S3 endpoint
  credentials: credentials,
  region: "global", // Region for Tebi.io
});

*/

export class S3KeyValueDatabase {
    private s3: S3Client;
    private bucket: string;

    constructor() {
        this.s3 = new S3Client({
            region: 'global',
            endpoint: 'https://s3.tebi.io',
            credentials: {
                accessKeyId: '1gEWvkg8w7tensLm',
                secretAccessKey: 'yiIw6zCDiNkgPMzmz47bLoOxIwUqFeGTJoaEMb4v'
            }
        });
        this.bucket = 'vercel-clone';
    }

    // Create or Update a key-value pair
    async set(key: string, value: any): Promise<void> {
        await this.s3.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: JSON.stringify(value),
            ContentType: 'application/json'
        }));
    }

    // Get a value by key
    async get(key: string): Promise<any | null> {
        try {
            const response = await this.s3.send(new GetObjectCommand({
                Bucket: this.bucket,
                Key: key
            }));

            const data = await this.streamToString(response.Body as Readable);
            return JSON.parse(data);
        } catch (error) {
            if ((error as Error).name === 'NoSuchKey') {
                return null; // Key does not exist
            }
            throw error;
        }
    }

    // Delete a key-value pair
    async delete(key: string): Promise<void> {
        await this.s3.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        }));
    }

    // List keys with a specific prefix
    async listKeys(prefix: string): Promise<string[]> {
        try {
            const response = await this.s3.send(new ListObjectsV2Command({
                Bucket: this.bucket,
                Prefix: prefix
            }));

            // Extract keys from the response
            return response.Contents?.map((object) => object.Key!) || [];
        } catch (error) {
            console.error('Error listing keys:', error);
            throw error;
        }
    }

    // Helper function to convert stream to string
    private async streamToString(stream: Readable): Promise<string> {
        return new Promise((resolve, reject) => {
            let data = '';
            stream.on('data', (chunk) => data += chunk);
            stream.on('end', () => resolve(data));
            stream.on('error', reject);
        });
    }
}