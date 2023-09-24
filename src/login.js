import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmission = () => {
    if (!(values.email || values.pass)) {
      setErrorMsg('FILL ALL THE FIELDS');
      return;
    }
    // setErrorMsg('');
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate('/main');
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="container">
      <div className="innerBox">
        <div className="signup-link">
          <Link to="/sign" className="link">
            Signup
          </Link>
        </div>
        <div className="label-input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="enter your email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
        </div>

        <div className="label-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="enter your password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />
        </div>

        <button disabled={submitButtonDisabled} onClick={handleSubmission}>
          LOGIN
        </button>
      </div>
      <div>
        <b className="error">{errorMsg}</b>
      </div>
    </div>
  );
}

export default Login;
