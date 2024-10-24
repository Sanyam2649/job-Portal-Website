import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import * as yup from 'yup';
import { userSignUpAction } from '../actions/userAction';

// Validation schema using Yup
const validationSchema = yup.object({
    firstName: yup
        .string('Enter your First Name')
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    lastName: yup
        .string('Enter your Last Name')
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // State for form inputs and errors
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate fields
    const validate = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            const formErrors = err.inner.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {});
            setErrors(formErrors);
            return false;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validate();
        if (isValid) {
            dispatch(userSignUpAction(formData));
            setFormData({ firstName: '', lastName: '', email: '', password: '' });
            setTimeout(() => {
                navigate('/login'); // Navigate to login page after 2 seconds
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-2xl font-semibold">Register</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mb-3 p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mb-3 p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mb-3 p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mb-3 p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    <button type="submit" className="bg-orange-500 text-white py-2 rounded-full">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
