/*import axios from "axios"
import { ChangeEvent, useContext, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../App"


function Login() {
    // State variables to track the logged in person
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const roleReference = useContext(authContext)

    // To naivgate users to another page we'll use a useNavigate hook
    const navigate = useNavigate();

    let login = async () =>{
        // Let's make sure they have entered a email and a password
        if (!email){
            alert("Please enter an email!")
            return;
        }

        if (!password){
            alert("Please enter a password")
            return;
        }

        // We need to send an axios post request
        try{
            let res = await axios.post<IUser>('http://3.85.92.181:8080/api/auth/login', 
                {email, password} // This is the body of our request
                // We don't need to add on the Content-Type=application/json since axios implicitly works with json
                // We can add "withCredentials:true" => This allows use to keep track of the JSESSIONID which holds
                // the logged in user
            )
            console.log(res);
            roleReference?.setRole(res.data.userType)
            roleReference?.setToken(res.data.accessToken)
            // On successful login we should redirect to the courses page (for now) 

            if (res.status === 200 ){
            // This indicates a successful login
                navigate('/private/hotels') // Courses route
                return
            }
        } catch (error){
            // If we're down here that means the username or password was incorrect
            setError(true)
        }
    }

  return (
    <div>
        <h1>Login</h1>

        <div id="loginForm">
            {error && <p style={{color:'red'}}>Username or Password is incorrect</p>}
            <label>
                Email: 
                <input type="email" value={email} 
                onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
            </label>
            <br />
            <label>
                Password: <input type="password" value={password}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </label>

            <br />
            <button onClick={login}>Login!</button>
        </div>
      
    </div>
  )
}

export default Login*/
import axios from "axios"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { useLocation, useNavigate } from "react-router-dom"
import { authContext } from "../../App"
import "./Login.css"

function Login() {
  // State variables to track the logged in person
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Username or Password is incorrect')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const roleReference = useContext(authContext)
  // To navigate users to another page we'll use a useNavigate hook
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const errorAuth = location.state?.error as string;
    if (errorAuth) {
      setError(true);
      setErrorMessage(errorAuth);
    }
  }, [location.state?.error]);

  let login = async () => {
    // Reset error state
    setError(false)
    
    // Let's make sure they have entered a email and a password
    if (!email) {
      setError(true)
      setErrorMessage("Please enter an email!")
      return;
    }
    if (!password) {
      setError(true)
      setErrorMessage("Please enter a password")
      return;
    }
    
    // Set submitting state to show loading indicator
    setIsSubmitting(true)
    
    // We need to send an axios post request
    try {
      let res = await axios.post<IUser>('http://3.85.92.181:8080/api/auth/login',
        {email, password} // This is the body of our request
        // We don't need to add on the Content-Type=application/json since axios implicitly works with json
        // We can add "withCredentials:true" => This allows use to keep track of the JSESSIONID which holds
        // the logged in user
      )
      console.log(res);
      roleReference?.setRole(res.data.userType)
      roleReference?.setToken(res.data.accessToken)
      
      // On successful login we should redirect to the hotels page
      if (res.status === 200) {
        // This indicates a successful login
        navigate('/private/hotels')
        return
      }
    } catch (error) {
      // If we're down here that means the username or password was incorrect
      setError(true)
      setErrorMessage("Username or Password is incorrect")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      login();
    }
  }

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <div className="login-form">
        {error && <div className="error-message">{errorMessage}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            className="form-control"
            type="email" 
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Enter your email"
            onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
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
        
        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        
        <button 
          className="login-button" 
          onClick={login}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  )
}

export default Login
