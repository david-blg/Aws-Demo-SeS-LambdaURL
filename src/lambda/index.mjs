// Import the necessary libraries
import { SendTemplatedEmailCommand, SESClient } from "@aws-sdk/client-ses";

// Create an instance of the SES client with the specified region (replace "<YOUR_REGION>" with your actual region)
const ses = new SESClient({ region: "<YOUR_REGION>" });

// This is the Lambda function to be executed
export const handler = async (event) => {
    // Log the data received from the event
    console.log('Data:', event.body);

    // Parse the JSON data from the event body
    const { name, subject, email, message } = JSON.parse(event.body);

    // Log the parsed values for debugging
    console.log('Subject value', subject);
    console.log('Email value', email);
    console.log('Name value', name);
    console.log('Message value', message);

    // Define the parameters required to send the email
    const params = {
        Destination: {
            ToAddresses: ["<YOUR_VERIFIED_EMAIL>"], // Destination email address (replace "<YOUR_VERIFIED_EMAIL>")
        },
        Source: "<YOUR_VERIFIED_EMAIL>", // Sender's email address (replace "<YOUR_VERIFIED_EMAIL>")
        Template: "TemplateContactDemo", // SES template name
        TemplateData: JSON.stringify({ // Data to replace in the template
            subject,
            email,
            name,
            message
        }),
    };

    try {
        // Send the email using SES
        const data = await ses.send(new SendTemplatedEmailCommand(params));

        if (data) {
            // Log a message if the email was sent successfully
            console.log("Email sent:", data);
        } else {
            // Log a message if the email was not sent
            console.log('Data was not sent to SES')
        }

    } catch (error) {
        // Catch and log any errors that occur during email sending
        console.error("Error sending the email:", error);

        // Return an error response to the client
        return {
            statusCode: 500,
            body: JSON.stringify("Error sending the email"),
        };
    }
};
