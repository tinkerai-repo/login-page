import React, { useState } from "react";
import "./SignUp.css";
import { FaGoogle, FaGithub } from 'react-icons/fa';
import logo from './assets/tinkerfai-logo.png';
import googleIcon from './assets/google_icon.png';

interface SignUpProps {
    onSignInClick: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignInClick }) => {
    const [experience, setExperience] = useState(2); // default to Master Tinkerer
    const experienceDescriptions = [
        "Just starting to explore the world of coding",
        "Comfortable with code and enjoy building things",
        "Skilled developer who can tackle complex projects"
    ];
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
        setPasswordError("");
        // Continue with form submission logic
    };

    return (
        <div className="signup-card">
            <img src={logo} alt="TinkerFAI Logo" className="login-logo" />
            <h3>Create an Account</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full name" required />
                <input type="email" placeholder="Email address" required />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (6+ characters)"
                        minLength={6}
                        required
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setPasswordError("");
                        }}
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: 'pointer' }}
                    >
                        {showPassword ? '👁️' : '🙈'}
                    </span>
                </div>
                <small>Password must be at least 6 characters long.</small>
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        required
                        value={confirmPassword}
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                            setPasswordError("");
                        }}
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        style={{ cursor: 'pointer' }}
                    >
                        {showConfirmPassword ? '👁️' : '🙈'}
                    </span>
                </div>
                {passwordError && (
                    <div className="error-msg">{passwordError}</div>
                )}
                <label className="slider-label">Your coding experience:</label>
                <div className="slider-section">
                    <input
                        type="range"
                        min="0"
                        max="2"
                        className="slider"
                        value={experience}
                        onChange={e => setExperience(Number(e.target.value))}
                    />
                    <div className="slider-labels">
                        <span className={experience === 0 ? "active-label" : ""}>Curious<br />Beginner</span>
                        <span className={experience === 1 ? "active-label" : ""}>Code<br />Adventurer</span>
                        <span className={experience === 2 ? "active-label" : ""}>Master<br />Tinkerer</span>
                    </div>
                    <div className="slider-desc">
                        <em>{experienceDescriptions[experience]}</em>
                    </div>
                </div>
                <button type="submit" className="create-account-btn">
                    Create Account
                </button>
            </form>
            <div className="or-divider-alt"><span>or</span></div>
            <button className="google-signup-btn" aria-label="Sign up with Google">
                <img src={googleIcon} alt="Google" className="google-img-icon" /> Sign up with Google
            </button>
            <div className="signin-link">
                Already have an account? <span onClick={onSignInClick}>Sign in</span>
            </div>
        </div>
    );
};

export default SignUp; 