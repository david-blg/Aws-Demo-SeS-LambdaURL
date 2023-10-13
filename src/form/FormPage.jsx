'use client'
import React, { useState } from 'react';
import { sendFormDataToLambda } from '../services/lambdaService'; // Import the service to send data to AWS SES

// Initial state of the form
const defaultFormState = {
    subject: '',
    name: '',
    email: '',
    message: ''
};

// Contact form component
const FormPage = () => {
    // Initialize the form state and a function to update it
    const [formState, setFormState] = useState(defaultFormState);
    const [loading, setLoading] = useState(false); // Initialize the loading state and a function to update it
    const [errors, setErrors] = useState({}); // Initialize the errors state and a function to update it

    // Handle changes in the form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit behavior
        setLoading(true); // Set loading to true to display a spinner
        setErrors({}); // Reset the errors state
        console.log(formState); // Log the form values to the console


        // Validate the form fields
        if (!formState.email || !formState.subject || !formState.message) {
            setErrors({
                email: !formState.email ? 'Email is required' : null,
                subject: !formState.subject ? 'Subject is required' : null,
                message: !formState.message ? 'Message is required' : null,
            });
            setLoading(false);
            return;
        }

        const response = await sendFormDataToLambda(formState); // Send data to AWS SES and await a response
        console.log('response', response); // Log the response to the console
        setLoading(false); // Set loading to false to hide the spinner
        setFormState(defaultFormState); // Reset the form to its initial state
    };

    return (
        <div className='flex flex-col justify-center items-center p-14 w-full'>

            <h1 className='text-2xl font-semibold mb-4'>Form Contact</h1>
            <h2 className='text-gray-500 mb-8'>A simple contact form for Demo AWS SES</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                {Object.keys(formState).map((fieldName) => (
                    <div key={fieldName} className='mb-4'>
                        <label className='text-gray-600 dark:text-white text-sm font-semibold'>
                            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                        </label>

                        {fieldName === 'message' ? (
                            <div className='w-[400px]'>
                                <textarea
                                    name={fieldName}
                                    value={formState[fieldName]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                                    className='h-28 resize-none text-sm/4 w-full bg-gray-50 border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:border-blue-300'
                                />
                            </div>

                        ) : (
                            <div>
                                <input
                                    type={fieldName === 'email' ? 'email' : 'text'}
                                    name={fieldName}
                                    value={formState[fieldName]}
                                    placeholder={`Enter ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                                    onChange={handleChange}
                                        className='w-full bg-gray-50 border text-sm border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:border-blue-300'
                                />
                            </div>
                        )}
                        {/* Display an error message if the form is submitted unsuccessfully */}
                        {errors[fieldName] && <p className='text-red-500'>{errors[fieldName]}</p>}
                    </div>
                ))}

                {errors.submit && <p className='text-red-500'>{errors.submit}</p>}


                {/* Display a spinner if the form is being submitted */}
                <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-full rounded focus:outline-none focus:ring focus:border-blue-300'>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-900'></div>
                        </div>
                    ) : (
                        'Submit'
                    )}
                </button>

            </form>
        </div>
    );
}

export default FormPage;
