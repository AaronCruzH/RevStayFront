/*import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../App"

function Register() {
  // State variables to track the registration form
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const roleReference = useContext(authContext)
  // To navigate users to another page we'll use a useNavigate hook
  const navigate = useNavigate();

  let register = async () => {
    // Reset error state
    setError(false)
    setErrorMessage('')
    
    // Form validation
    if (!firstName) {
      setError(true)
      setErrorMessage("Please enter your first name!")
      return;
    }
    if (!lastName) {
      setError(true)
      setErrorMessage("Please enter your last name!")
      return;
    }
    if (!email) {
      setError(true)
      setErrorMessage("Please enter an email!")
      return;
    }
    if (!password) {
      setError(true)
      setErrorMessage("Please enter a password!")
      return;
    }
    if (password !== confirmPassword) {
      setError(true)
      setErrorMessage("Passwords do not match!")
      return;
    }

    // We need to send an axios post request
    try {
      let res = await axios.post<IUser>('http://localhost:8080/api/auth/register',
        { firstName, lastName, email, password } // This is the body of our request
      )
      console.log(res);
      
      // On successful registration, we can login the user automatically
      if (res.status === 201) {
        // Auto-login after registration
        try {
          let loginRes = await axios.post<IUser>('http://localhost:8080/api/auth/login',
            { email, password }
          )
          
          roleReference?.setRole(loginRes.data.userType)
          roleReference?.setToken(loginRes.data.accessToken)
          
          // Redirect to the home page or dashboard
          navigate('/private/hotels')
          return
        } catch (loginError) {
          // If auto-login fails, redirect to login page instead
          navigate('/login')
          return
        }
      }
    } catch (error: any) {
      // Handle registration errors
      setError(true)
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message)
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("Email already exists!")
      } else {
        setErrorMessage("Registration failed. Please try again.")
      }
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <div id="registerForm">
        {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <label>
          First Name:
          <input 
            type="text" 
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        
        <label>
          Last Name:
          <input 
            type="text" 
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
        </label>
        <br />
        
        <label>
          Email:
          <input 
            type="email" 
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </label>
        <br />
        
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </label>
        <br />
        
        <label>
          Confirm Password:
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        
        <button onClick={register}>Register</button>
        
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  )
}

export default Register*/
import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../App"
import "./Register.css"

function Register() {
  // State variables to track the registration form
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const roleReference = useContext(authContext)
  // To navigate users to another page we'll use a useNavigate hook
  const navigate = useNavigate();

  let register = async () => {
    // Reset error state
    setError(false)
    setErrorMessage('')
    
    // Form validation
    if (!firstName) {
      setError(true)
      setErrorMessage("Please enter your first name!")
      return;
    }
    if (!lastName) {
      setError(true)
      setErrorMessage("Please enter your last name!")
      return;
    }
    if (!email) {
      setError(true)
      setErrorMessage("Please enter an email!")
      return;
    }
    if (!password) {
      setError(true)
      setErrorMessage("Please enter a password!")
      return;
    }
    if (password !== confirmPassword) {
      setError(true)
      setErrorMessage("Passwords do not match!")
      return;
    }

    // Set submitting state to show loading indicator
    setIsSubmitting(true)

    // We need to send an axios post request
    try {
      let res = await axios.post<IUser>('http://localhost:8080/api/auth/register',
        { firstName, lastName, email, password } // This is the body of our request
      )
      console.log(res);
      
      // On successful registration, we can login the user automatically
      if (res.status === 201) {
        // Auto-login after registration
        try {
          let loginRes = await axios.post<IUser>('http://localhost:8080/api/auth/login',
            { email, password }
          )
          
          roleReference?.setRole(loginRes.data.userType)
          roleReference?.setToken(loginRes.data.accessToken)
          
          // Redirect to the home page or dashboard
          navigate('/private/hotels')
          return
        } catch (loginError) {
          // If auto-login fails, redirect to login page instead
          setIsSubmitting(false)
          navigate('/login')
          return
        }
      }
    } catch (error: any) {
      // Handle registration errors
      setIsSubmitting(false)
      setError(true)
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message)
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("Email already exists!")
      } else {
        setErrorMessage("Registration failed. Please try again.")
      }
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      <div className="register-form">
        {error && <div className="error-message">{errorMessage}</div>}
        
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName"
            className="form-control"
            type="text" 
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName"
            className="form-control"
            type="text" 
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            className="form-control"
            type="email" 
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input 
              id="password"
              className="form-control"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-wrapper">
            <input 
              id="confirmPassword"
              className="form-control"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={toggleConfirmPasswordVisibility}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        
        <button 
          className="register-button" 
          onClick={register}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
        
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

export default Register