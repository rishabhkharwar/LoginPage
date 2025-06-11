import React, { useState } from "react";
import { FaGooglePlusG, FaFacebookF, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.css";

// Password rules: min 8 chars, upper, lower, number, symbol
const passwordRules = [
  { test: v => v.length >= 8, msg: "At least 8 characters" },
  { test: v => /[A-Z]/.test(v), msg: "One uppercase letter" },
  { test: v => /[a-z]/.test(v), msg: "One lowercase letter" },
  { test: v => /[0-9]/.test(v), msg: "One number" },
  { test: v => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v), msg: "One special symbol" }
];

const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = name => name.trim().length > 0;

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });
  const [signupPasswordTouched, setSignupPasswordTouched] = useState(false);

  // Responsive: show only one panel on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 730);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Password validation for signup
  const failedPasswordRules = passwordRules.filter(rule => !rule.test(signUp.password));

  // Social auth handlers (demo)
  const handleGoogleAuth = (type) => toast.info(`Google ${type} (frontend demo only)`);
  const handleFacebookAuth = (type) => toast.info(`Facebook ${type} (frontend demo only)`);
  const handleGithubAuth = (type) => toast.info(`GitHub ${type} (frontend demo only)`);

  // Form handlers
  const handleInputChange = (e, type = "signin") => {
    const { name, value } = e.target;
    if (type === "signin") setSignIn({ ...signIn, [name]: value });
    else setSignUp({ ...signUp, [name]: value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!validateEmail(signIn.email))
      return toast.error("Please enter a valid email address.");
    if (signIn.password.length < 6)
      return toast.error("Password must be at least 6 characters.");
    toast.success("Signed in successfully! (frontend demo)");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!validateName(signUp.name))
      return toast.error("Please enter your name.");
    if (!validateEmail(signUp.email))
      return toast.error("Please enter a valid email address.");
    if (failedPasswordRules.length > 0)
      return toast.error("Password does not meet all the requirements.");
    toast.success("Account created successfully! (frontend demo)");
  };

  return (
    <div className="auth-bg">
      <div className={`auth-root${isSignUp ? " signup-active" : ""}`}>
        {/* Sign In Form */}
        {(!isMobile || !isSignUp) && (
          <div className="auth-panel">
            <form className="auth-form" onSubmit={handleSignIn} autoComplete="off">
              <h1 className="auth-title">Sign In</h1>
              <div className="auth-social-row">
                <button type="button" className="auth-social" aria-label="Sign in with Google" onClick={() => handleGoogleAuth("Sign In")}><FaGooglePlusG /></button>
                <button type="button" className="auth-social" aria-label="Sign in with Facebook" onClick={() => handleFacebookAuth("Sign In")}><FaFacebookF /></button>
                <button type="button" className="auth-social" aria-label="Sign in with GitHub" onClick={() => handleGithubAuth("Sign In")}><FaGithub /></button>
              </div>
              <span className="auth-span">or use your email password</span>
              <input name="email" type="email" placeholder="Email" className="auth-input" value={signIn.email} onChange={e => handleInputChange(e, "signin")} autoComplete="email" />
              <input name="password" type="password" placeholder="Password" className="auth-input" value={signIn.password} onChange={e => handleInputChange(e, "signin")} autoComplete="current-password" />
              <a href="#" className="auth-forgot">Forget Your Password?</a>
              <button type="submit" className="auth-btn">Sign In</button>
              {isMobile && (
                <div className="auth-mobile-toggle">
                  <span>Don't have an account?</span>
                  <button type="button" className="auth-switch-btn" onClick={() => setIsSignUp(true)}>Sign Up</button>
                </div>
              )}
            </form>
          </div>
        )}
        {/* Sign Up Form */}
        {(!isMobile || isSignUp) && (
          <div className="auth-panel">
            <form className="auth-form" onSubmit={handleSignUp} autoComplete="off">
              <h1 className="auth-title">Create Account</h1>
              <div className="auth-social-row">
                <button type="button" className="auth-social" aria-label="Sign up with Google" onClick={() => handleGoogleAuth("Sign Up")}><FaGooglePlusG /></button>
                <button type="button" className="auth-social" aria-label="Sign up with Facebook" onClick={() => handleFacebookAuth("Sign Up")}><FaFacebookF /></button>
                <button type="button" className="auth-social" aria-label="Sign up with GitHub" onClick={() => handleGithubAuth("Sign Up")}><FaGithub /></button>
              </div>
              <span className="auth-span">or use your email for registration</span>
              <input name="name" type="text" placeholder="Name" className="auth-input" value={signUp.name} onChange={e => handleInputChange(e, "signup")} autoComplete="username" />
              <input name="email" type="email" placeholder="Email" className="auth-input" value={signUp.email} onChange={e => handleInputChange(e, "signup")} autoComplete="email" />
              <input name="password" type="password" placeholder="Password" className="auth-input" value={signUp.password} onChange={e => handleInputChange(e, "signup")} onBlur={() => setSignupPasswordTouched(true)} autoComplete="new-password" />
              {signupPasswordTouched && signUp.password.length > 0 && failedPasswordRules.length > 0 && (
                <div className="auth-password-note-error">
                  <b>Password must include:</b>
                  <ul>
                    {failedPasswordRules.map((rule, idx) => (
                      <li key={idx}>{rule.msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button type="submit" className="auth-btn">Sign Up</button>
              {isMobile && (
                <div className="auth-mobile-toggle">
                  <span>Already have an account?</span>
                  <button type="button" className="auth-switch-btn" onClick={() => setIsSignUp(false)}>Sign In</button>
                </div>
              )}
            </form>
          </div>
        )}
        {/* Overlay only on desktop/tablet */}
        {!isMobile && (
          <div className="auth-overlay-container">
            <div className="auth-overlay">
              <div className="auth-overlay-panel auth-overlay-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="auth-btn ghost" onClick={() => setIsSignUp(false)} type="button">
                  Sign In
                </button>
              </div>
              <div className="auth-overlay-panel auth-overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button className="auth-btn ghost" onClick={() => setIsSignUp(true)} type="button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}