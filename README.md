# Serverless Lambda Hook to Start an EC2 Server
For fully detached websites that use a server-based CMS it's not necessary to keep the server on when not doing content entry. Turning the server off when not in use increases security and reduces monthly cloud costs. 

This lambda hook makes turning the server on easier by creating a webhook that can turn the server on without needing to log into AWS. This hook turns an instance on and displays a waiting webpage that redirects to your backend after a few seconds.

## Permissions
- Requires the `StartInstance` 'Write' permission in IAM. Create a role with at least this level of permission in IAM and attach it to the Lambda function.

## Expected Environment Variables
These variables should be configured in the Lambda settings.


| Variable Name | Description |
| ------------- | ----------- |
| REDIRECT_URL | URL of the server being turned on. The user will be redirected there after it turns on. |
| WAIT_TIME | (Optional, defaults to 10) Time to pause on the waiting screen until the user is redirected. |
| INSTANCE_ID | EC2 Instance ID. |

