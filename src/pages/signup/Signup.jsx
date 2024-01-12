import './Signup.css';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast, ToastContainer} from "react-toastify";

const Signup = () => {
    const {
        register,
        formState: { errors,isValid, isDirty },
        handleSubmit,
        getValues,
        trigger
    } = useForm();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleToast = (message, type) => {
        toast[type](message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Auto-close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const onSignupSubmit = async (formData) => {
        delete formData.confirmPassword;
        // e.preventDefault();

        if (isValid) {
            try {
                const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if(response.ok) {
                    const result = await response.json();
                    handleToast(result.success, 'success');
                } else {
                    const error = await response.json();
                    handleToast(error.error, 'error');
                }
            } catch (error) {
                console.error('Error during signup', error);
                const genericError = "An error occurred during signup. Please try again.";
                handleToast(genericError, 'error');
            }
        }
    };

    const onBlurValidation = async (fieldName) => {
        await trigger(fieldName);
    }
    const onInputValidation = async (fieldName) => {
        await trigger(fieldName);
    };

    return (
        <div className="signup-container">
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit(onSignupSubmit)}>
                <div className="label-group">
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input id="first_name" autoComplete="given-name"
                               {...register('first_name', {
                                   required: 'First name is required',
                                   pattern: {
                                       value: /^[A-Za-z]+$/i,
                                       message: 'Invalid first name',
                                   },
                                   minLength: {
                                       value: 2,
                                       message: 'Min length is 2 characters',
                                   },
                                   maxLength: {
                                       value: 20,
                                       message: 'Max length is 20 characters',
                                   },
                               })}
                               onBlur={() => onBlurValidation('first_name')}
                               onInput={() => onInputValidation('first_name')}
                        />
                        {errors.first_name && (
                            <p className="error-message">{errors.first_name.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input id="last_name" autoComplete="family-name"
                               {...register('last_name', {
                                   required: 'Last name is required',
                                   pattern: {
                                       value: /^[A-Za-z]+$/i,
                                       message: 'Invalid last name',
                                   },
                                   minLength: {
                                       value: 2,
                                       message: 'Min length is 2 characters',
                                   },
                                   maxLength: {
                                       value: 20,
                                       message: 'Max length is 20 characters',
                                   },
                               })}
                               onBlur={() => onBlurValidation('last_name')}
                               onInput={() => onInputValidation('last_name')}
                        />
                        {errors.last_name && (
                            <p className="error-message">{errors.last_name.message}</p>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" autoComplete="email"
                           {...register('email', {
                               required: 'Email is required',
                               pattern: {
                                   value: /\S+@\S+\.\S+/,
                                   message: 'Invalid email address',
                               },
                           })}
                            onBlur={() => onBlurValidation('email')}
                            onInput={() => onInputValidation('email')}
                    />
                    {errors.email && (
                        <p className="error-message">{errors.email.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" autoComplete="new-password"
                           type="password"
                           {...register('password', {
                               required: 'Password is required',
                               minLength: {
                                   value: 8,
                                   message: 'Min length is 8 characters',
                               },
                               maxLength: {
                                   value: 16,
                                   message: 'Max length is 16 characters',
                               },
                               pattern: {
                                   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                   message: 'Invalid password',
                               },
                           })}
                           onBlur={() => onBlurValidation('password')}
                           onInput={() => onInputValidation('password')}
                    />
                    {errors.password && (
                        <p className="error-message">{errors.password.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" autoComplete="new-password"
                           type="password"
                           {...register('confirmPassword', {
                               validate: (value) =>
                                   value === getValues('password') ||
                                   'Passwords do not match',
                           })}
                           onBlur={() => onBlurValidation('confirmPassword')}
                           onInput={() => onInputValidation('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <p className="error-message">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button type="submit"
                        className={`signup-button ${!isDirty || !isValid ? 'signup-button-disabled' : ''}`}
                >
                    Sign Up
                </button>

                <div className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
