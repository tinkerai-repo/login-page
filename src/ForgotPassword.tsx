import React, { useState } from 'react';
import './ForgotPassword.css';
import logo from './assets/tinkerfai-logo.png';

interface ForgotPasswordProps {
    onBackToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (value: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        // Here you would typically make an API call to handle password reset
        setIsSubmitted(true);
    };

    return (
        <div className="forgot-password-container">
            <img src={logo} alt="TinkerFAI Logo" className="login-logo" />
            <h2 className="forgot-password-title">Forgot Password</h2>
            {!isSubmitted ? (
                <>
                    <p className="forgot-password-text">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                    <form className="forgot-password-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="login-input"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {emailError && <div className="error-msg">{emailError}</div>}
                        <button type="submit" className="login-btn">Send Reset Link</button>
                    </form>
                </>
            ) : (
                <div className="success-message">
                    <p>Password reset instructions have been sent to your email.</p>
                    <p className="check-email">Please check your inbox.</p>
                </div>
            )}
            <button onClick={onBackToLogin} className="back-to-login">
                Back to Login
            </button>
        </div>
    );
};

export default ForgotPassword; 