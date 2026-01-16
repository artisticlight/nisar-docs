# AWS S3 Access

## Overview
All NISAR data is hosted in the Amazon Web Services (AWS) cloud via the Simple Storage Service (S3). Data users can request temporary AWS credentials enabling direct access to the data in S3. This supports the use of a wide range of S3-aware tooling for interacting with cloud-hosted data as well as for low-latency and high-throughput data access patterns.

## Accessing NISAR Data via S3 Using AWS CLI

1. Visit https://nisar.asf.earthdatacloud.nasa.gov/s3credentials and sign in with your Earthdata Login credentials to retrieve a set of temporary AWS credentials. These credentials allow users to list and download contents of the S3 bucket. This site will provide three keys: 
    * AWS Access Key ID
    * AWS Secret Access Key
    * AWS Session Token
   
   For example, 
```shell
{  
  accessKeyId: "ASIAIOSFODNN7EXAMPLE",  
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",  
  sessionToken: "LONGSTRINGOFCHARACTERS...AQoDYXdzEJrlIEOjrOChLQYmzAqrb5U1ekoQAK6f86HKJFTT2dONzPgmJN9ZvW5DBwt6XUxC9HAQ0LDPEYEwbjGVKkzSNQh/", 
  expiration: "2026-01-27 00:50:09+00:00"
}
```
   For more information, you can visit [ASF's S3 credentials README](https://nisar.asf.earthdatacloud.nasa.gov/s3credentialsREADME).

2. Configure your environment to use the temporary AWS credentials by setting the environment variables in your terminal. 
   For example, if you are on a Linux operating system, you can export your credentials with the following commands:
```shell
export AWS_ACCESS_KEY_ID=ASIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export AWS_SESSION_TOKEN=AQoDYXdzEJr...<remainder of session token>
```
   For a full list of exportable variables, see [AWS's Temporary Credentials User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html)

3. Explore the `sds-n-cumulus-prod-nisar-products` S3 bucket to find data of interest. The bucket is organized by product type, then by product. Consult @nisar-naming-conventions to understand the product names to help find what you're looking for.
4. Open or download data files.

## Limitations

S3 Access for NISAR data is subject to these limitations:
- The temporary credentials only allow access from within the us-west-2 region
- The temporary credentials expire after one hour.
- Temporary credentials cannot be used to sync content directly to another S3 bucket

CMR granule records include s3 URIs in addition to http URLs.

earthaccess can do a lot of this for you

https://tea-docs.asf.alaska.edu/s3access/
