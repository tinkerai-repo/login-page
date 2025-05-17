import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from './assets/tinkerfai-logo.png';
import puzzleBg from './assets/close-up-puzzle-background.jpg';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import googleIcon from './assets/google_icon.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isBgLoaded, setIsBgLoaded] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        // Create a new image object
        const img = new Image();

        // Set up loading handlers
        img.onload = () => {
            setIsBgLoaded(true);
            document.querySelector('.puzzle-bg')?.classList.add('loaded');
        };

        img.onerror = () => {
            console.error('Failed to load background image');
        };

        // Start loading the image
        img.src = puzzleBg;

        // Cleanup
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, []);

    const validateEmail = (value: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value);
    };

    const validatePassword = (value: string) => {
        // At least 6 chars, at least one letter, one number, and one special character
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/.test(value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters and contain a letter, a number, and a special character.');
            valid = false;
        }
        if (valid) {
            // Handle login logic
        }
    };

    const handleForgotPasswordClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowForgotPassword(true);
    };

    const handleSignUpClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowSignUp(true);
    };

    const handleSignInClick = () => {
        setShowSignUp(false);
    };

    const handleBackToLogin = () => {
        setShowForgotPassword(false);
    };

    return (
        <div className="puzzle-bg">
            {showSignUp ? (
                <div className="centered-auth">
                    <SignUp onSignInClick={handleSignInClick} />
                </div>
            ) : (
                <>
                    <div className={`login-container ${showForgotPassword ? 'hidden' : ''}`}>
                        <img src={logo} alt="TinkerFAI Logo" className="login-logo" />
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="login-input"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            {emailError && <div className="error-msg">{emailError}</div>}
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="login-input"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? '👁️' : '🙈'}
                                </span>
                            </div>
                            {passwordError && <div className="error-msg">{passwordError}</div>}
                            <div className="login-options">
                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe((prev) => !prev)}
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>
                                    Forgot password?
                                </a>
                            </div>
                            <button type="submit" className="login-btn">Sign in</button>
                        </form>
                        <div className="or-divider-alt"><span>or</span></div>
                        <button className="google-signup-btn" type="button" title="Sign in with Google">
                            <img src={googleIcon} alt="Google" className="google-img-icon" /> Sign in with Google
                        </button>
                        <div className="signup-text">
                            Not a member? <a href="#" className="signup-link" onClick={handleSignUpClick}>Sign up now</a>
                        </div>
                    </div>
                    <div className={`forgot-password-container ${!showForgotPassword ? 'hidden' : ''}`}>
                        <ForgotPassword onBackToLogin={handleBackToLogin} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Login; 