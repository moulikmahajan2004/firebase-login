import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPassword: "", // Add confirmPassword field
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmission = () => {
    if (!(values.name && values.email && values.pass && values.confirmPassword)) {
      setErrorMsg("FILL ALL THE FIELDS");
      return;
    }

    if (values.pass !== values.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        // Update the user's display name
        await updateProfile(user, {
          displayName: values.name,
        });

        try {
          // Store user data in Firestore
          await addDoc(collection(db, "users"), {
            name: values.name,
            email: values.email,
          });

          // After storing data in Firestore, you can navigate to the desired route.
          navigate("/");
        } catch (error) {
          setErrorMsg("Error storing user data: " + error.message);
          setSubmitButtonDisabled(false);
        }
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="signup">
      <div className="box1">
        <h1>Create DEV@deakin Account</h1>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        <div className="input-group">
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
        <div className="input-group">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            id="pass"
            placeholder="enter your password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm your password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, confirmPassword: event.target.value }))
            }
          />
        </div>
        <button onClick={handleSubmission} disabled={submitButtonDisabled}>
          Create
        </button>
        <div>
          <b className="error">{errorMsg}</b>
        </div>
        <h3>Already have an account?</h3>
        <h5>
          <span>
            <Link to="/log">login</Link>
          </span>
        </h5>
      </div>
    </div>
  );
}

export default Signup;
