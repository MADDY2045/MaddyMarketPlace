import React,{ useState } from 'react';
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAuth';
import Spinner from '../components/Spinner';

const SignIn = () => {
  const [ showPassowrd,setShowPassword ] = useState(false);
  const [ loading,setLoading ] = useState(false);
  const [ formData,setFormData ] = useState({
    email:'',
    password:''
  });

  const { email,password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
      setFormData( prevState =>({...prevState,[e.target.id]:e.target.value}))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth,email,password);
      if(userCredential.user){
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      toast.error("BAD USER CREDENTIALS!");
      setLoading(false);
    }    
  }

  if(loading) return <Spinner/>
  
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>
        <main>
          <form onSubmit={ onSubmit }>
            <input
            onChange={ onChange }
            id="email"
            value = { email } 
            type="email" 
            className="emailInput"
            placeholder='Enter Email'
             />
             <div className="passwordInputDiv">
                <input 
                onChange={ onChange }
                type={ showPassowrd ? "text" : "password"}
                value= { password }
                id="password"
                className='passwordInput'
                placeholder='Enter Password'
                 />
               <img 
               onClick={()=> setShowPassword((prevState)=>!prevState )}
               src={ visibilityIcon } 
               alt="showPassword" 
               className="showPassword" />  
             </div>
             <Link to="/forget-password" className='forgotPasswordLink'>
                Forgot Password
             </Link>
             <div className="signInBar">
               <p className="signInText">
                 Sign In
               </p>
               <button className="signInButton">
                 <ArrowRightIcon fill="#fffff" width="34px" height="34px"/>
               </button>
             </div>
          </form>         
          <Link to="/sign-up" className='registerLink'>
            Sign Up instead?
          </Link>
          <OAuth />
        </main>
      </div>
    </>
  )
}

export default SignIn;