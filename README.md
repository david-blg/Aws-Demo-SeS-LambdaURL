Here is the translated documentation in English:

# AWS SES Demo with Lambda Function

This repository contains a demonstration of how to use Amazon Simple Email Service (SES) from AWS along with a Lambda function to send personalized emails. Follow these steps to set up and run the demo.

## Contents

1. [Requirements](#requirements)
2. [Creating an SES Template](#step-1-creating-an-ses-template)
3. [Uploading the SES Template with AWS CLI](#step-2-uploading-the-ses-template-with-aws-cli)
4. [Granting Permissions to the Lambda Function](#step-3-granting-permissions-to-the-lambda-function)
5. [Implementing the Lambda Function](#step-4-implementing-the-lambda-function)
6. [Creating a Web Form](#step-5-creating-a-web-form)

## Requirements

Before you begin, make sure you meet the following requirements:

- [AWS CLI](https://aws.amazon.com/cli/) must be installed and configured.
- You should have Node.js and npm installed in your development environment.
- You should have access to AWS SES and the necessary permissions to configure templates and Lambda functions.

## Step 1: Creating an SES Template

### 1.1. Create an MJML File

Start by creating an MJML file to define the structure of your email.

### 1.2. Convert MJML to HTML

Use the official [MJML page](https://mjml.io/) to convert your MJML file into HTML.

### 1.3. Convert HTML to Escaped JSON

Take the HTML generated in the previous step and convert it into escaped JSON. This is necessary for the SES template. You can perform this conversion on [this site](https://www.freeformatter.com/json-escape.html).

### 1.4. SES Template in .json Format

Create a JSON file that follows the required structure for the SES template. Make sure to include the escaped JSON in the "HtmlPart" section of the template. You can use the provided example file `aws_ses_demo_template.json`.

## Step 2: Uploading the SES Template with AWS CLI

### 2.1. AWS CLI Configuration

Make sure that AWS CLI is configured in your environment.

### 2.2. Upload the SES Template

Use the following AWS CLI command to upload the SES template to AWS:

```bash
aws ses create-template --cli-input-json file://aws_ses_demo_template.json
```

Ensure that the `aws_ses_demo_template.json` file contains the details of your template.

### 2.3. Updating Changes

If you need to make changes to the template, you can update it using the following command:

```bash
aws ses update-template --cli-input-json file://aws_ses_demo_template.json
```

## Step 3: Granting Permissions to the Lambda Function

To allow your Lambda function to send emails through SES, you must configure an IAM role with the following permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendTemplatedEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

### Step 4: Implementing the Lambda Function

1. Open the AWS console and navigate to the Lambda section.

2. Click on "Create function."

3. Fill in the function details:
   - **Function name**: You can choose a descriptive name, such as "SESEmailSendLambda."
   - **Runtime**: Select the Node.js 18 execution environment.

4. In the "Execution role" section, select a role that has permissions to send emails through SES. You can use the IAM role configured in "Step 3" with the necessary permissions.

5. Click "Create function" to create the Lambda function.

6. Now, on the Lambda function details page, you can paste the provided JavaScript code as an example of how to send emails using the SES template and SDK v3. You can customize it according to your needs.

## Step 5: Creating a Web Form

### 5.1. Contact Form

Create a web form to collect email information, including fields for name, subject, email, and message. You can use the `FormPage` component and customize it to your requirements.

### 5.2. Sending Data to the Lambda Function

To implement data submission to the Lambda function, you can use the `lambdaService` example code in your frontend application.