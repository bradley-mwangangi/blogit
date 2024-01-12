import './UserProfile.css';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

const UserProfile = () => {
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        // Add other user details as needed
    });

    const [avatarUrl, setAvatarUrl] = useState(
        'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1704919933~exp=1704920533~hmac=7817e9eb8bdeba0b514cc8bf81dffbb7c2ec93090ce434c7f0ce39bcba1af16a'
    ); // Provide the default avatar URL

    useEffect(() => {
        // Fetch user details and avatar URL from the server when the component mounts
        // Adjust this according to your actual data fetching mechanism
        // fetchUserData(); // Uncomment this line if you are fetching data asynchronously
        // fetchAvatarUrl(); // Uncomment this line if you are fetching avatar asynchronously
    }, []); // Empty dependency array ensures this runs once when the component mounts

    const handleUpdateClick = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
                },
                body: JSON.stringify({
                    avatar_url: data.avatarUrl,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                }),
            });

            if (response.ok) {
                // Handle successful update (e.g., show a success message)
                console.log('User profile updated successfully');
            } else {
                // Handle errors (e.g., show an error message)
                console.error('Failed to update user profile');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit(handleUpdateClick)}>
                <img src={avatarUrl || 'default-avatar.jpg'} alt="User Avatar" className="avatar" />
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        value={user.firstName} // replace this with fetch from database
                        {...register('firstName', {
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
                    />
                    {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        value={user.lastName} // replace this with fetch from database
                        {...register('lastName', {
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
                    />
                    {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        value={user.email} // replace this with fetch from database
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                <button type="submit" className="update-button">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
