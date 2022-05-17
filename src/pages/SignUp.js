import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { setDoc,doc,serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import OAuth from '../components/OAuth';
import Spinner from '../components/Spinner';

const SignUp = () => {
  const [ showPassowrd,setShowPassword ] = useState(false);
  const [ loading,setLoading ] = useState(false);
  const [ formData,setFormData ] = useState({
    name:'',
    email:'',
    password:''
  });

  const { name,email,password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
      setFormData( prevState =>({...prevState,[e.target.id]:e.target.value}))
  }

  const onSubmit = async (e) => {
    e.preventDefault();    
    try {
      setLoading(true);
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName:name,
      })

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db,'users',user.uid),formDataCopy)
      setLoading(false);
      navigate('/');

    } catch (error) {
        toast.error("Something Went wrong with registration!!")
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
            id="name"
            value = { name } 
            type="text" 
            className="nameInput"
            placeholder='Name'
             />
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
             <div className="signUpBar">
               <p className="signUpText">
                 Sign Up
               </p>
               <button className="signUpButton">
                 <ArrowRightIcon fill="#fffff" width="34px" height="34px"/>
               </button>
             </div>
             
          </form>
             
          <Link to="/sign-in" className='registerLink'>
              Sign In instead?
          </Link>   
          <OAuth/> 
        </main>
      </div>
    </>
  )
}

export default SignUp;