'use server'

import { S3Client } from "@aws-sdk/client-s3";

const createS3Client = async () => {
    const { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } = process.env
    return new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID as string,
            secretAccessKey: AWS_SECRET_ACCESS_KEY as string
        },
    });
};

export { createS3Client };