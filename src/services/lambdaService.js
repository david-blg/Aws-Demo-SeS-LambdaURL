
/**
 * Sends data to a Lambda function.
 * @param {object} values - The data to be sent to the Lambda function.
 * @returns {Promise<Response>} - A promise that resolves to the Lambda function's response.
 * @throws {Error} - Throws an error if the request cannot be completed.
 */

/** 
 * In a TypeScript environment, you would typically import a type definition
 * for the 'values' parameter to ensure data consistency. For example:
 * @import { FormData } from "./typeFetchtoApi";
 * Here, 'FormData' would be an interface or type definition that matches
   the structure of the data you expect.
 */

export const sendFormDataToLambda = async (values) => {
    const LAMBDA_ENDPOINT = process.env.NEXT_PUBLIC_LAMBDA_ENPOINT;
    // console.log('LAMBDA_ENDPOINT', LAMBDA_ENDPOINT)
    console.log('values', values)

    if (!LAMBDA_ENDPOINT) {
        throw new Error('Missing LAMBDA_ENDPOINT env variable');
    }

    try {
        const response = await fetch(LAMBDA_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(values),
        });
        console.log('response from Lambda', response);
        return response;
    } catch (error) {
        throw new Error('Error sending data to Lambda: ' + error);
    }
};