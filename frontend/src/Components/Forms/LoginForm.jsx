import React, { useState, useEffect } from 'react';
import styles from './Forms.module.css';
import mailIcon from '../../Assets/Icons/mailIcon.png';
import passwordIcon from '../../Assets/Icons/passwordIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/Slices/userSlice';

const LoginForm = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [navigate, isAuthenticated]);

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [inputError, setInputError] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    setInputError({ ...inputError, [name]: '' });
  };

  const handleLogin = (event) => {
    const { email, password } = userData;
    event.preventDefault();
    const currentErrors = {};

    if (!email.trim()) {
      currentErrors.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = 'Email is invalid!';
    }

    if (password.trim() === '') {
      currentErrors.password = 'Password is required';
    }

    if (Object.keys(currentErrors).length > 0) {
      setInputError(currentErrors);
      return;
    }

    setLoading(true);
    dispatch(login({ email, password })).finally(() => {
      setLoading(false);
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeading}>Login</div>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.inputBox}>
            <img src={mailIcon} alt="mail-icon" className={styles.icons} />
            <input
              type="text"
              className={styles.input}
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </label>
          {inputError.email && <p style={{ fontSize: 'xx-small', color: 'red' }}>{inputError.email}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputBox}>
            <img src={passwordIcon} alt="password-icon" className={styles.icons} />
            <input
              type={passwordVisible ? 'text' : 'password'}
              className={styles.input}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className={styles.eye_Icon}
            />
          </label>
          {inputError.password && <p style={{ fontSize: 'xx-small', color: 'red' }}>{inputError.password}</p>}
        </div>
        <button className={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <div className={styles.formFooter}>
        <div className={styles.footerText}>Have no account yet?</div>
        <button
          className={styles.button}
          style={{ color: '#17A2B8', border: '1px solid #17A2B8', backgroundColor: 'white' }}
          onClick={() => {
            navigate('/register');
          }}
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
