import './Login.css';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast, ToastContainer} from "react-toastify"; // Import your CSS file for styling
import {storeTokens} from '../../service/authService'


const Login = () => {
    const {
        register,
        formState: { errors, isValid, isDirty },
        handleSubmit,
        trigger
    } = useForm();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleToast = (message, type) => {
        toast[type](message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000, // Auto-close after 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const onLoginSubmit = async (formData) => {
        if (isValid) {
            try {
                const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if(response.ok) {
                    const accessToken = response.headers.get('Authorization');
                    const refreshToken = response.headers.get('Refresh-Token');
                    storeTokens(accessToken, refreshToken);

                    const successMsg = "Login successful. Redirecting you to home";
                    handleToast(successMsg, 'success');
                } else if (response.status === 403) {
                    const error = "Wrong username or password.";
                    handleToast(error, 'error');
                } else {
                    const anyOtherError = "Server error. Please contact admin or try again later.";
                    handleToast(anyOtherError, 'error');
                }
            } catch (error) {
                console.error('Error during login', error);
                const genericError = "An error occurred during login. Please try again.";
                handleToast(genericError, 'error');
            }
        }
    };

    const onBlurValidation = async (fieldName) => {
        await trigger(fieldName);
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
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
                    />
                    {errors.email && (
                        <p className="error-message">{errors.email.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" autoComplete="current-password"
                           type="password"
                           {...register('password', {
                               required: 'Password is required',
                           })}
                           onBlur={() => onBlurValidation('password')}
                    />
                    {errors.password && (
                        <p className="error-message">{errors.password.message}</p>
                    )}
                </div>

                <button type="submit"
                        className={`signup-button ${!isDirty || !isValid ? 'signup-button-disabled' : ''}`}
                >
                    Login
                </button>

                <div className="signup-link">
                    Don't have an account? <a href="/signup">Signup here</a>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
