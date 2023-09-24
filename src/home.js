import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css'; 

function Home( props){
  return (
    <div className={styles.home}>
      <div className={styles.box}>
        <h3>DEV@DEAKIN</h3>
        <input className={styles.search} placeholder='search🔍'></input>
        <h3 className={styles.login}>
          POST
        </h3>
        <br />
        <br />
        <br />
        <h3 className='sig'>
          <Link to="/log">LOGIN</Link>
        </h3>
      </div>
      <br />
      <br />
      <br />
      {/* //curly braces are used to embbed the javascript in it */}
      {/* HERE THE YERNARY CONSDITION IS IS USED IF THE CONDITION IS TRUE THEN THE WELCOME WITH THE NAME IS PRINTED ELESE THE LOGIN PLEASE */}
      <h2>{props.name ? `welcome- ${props.name}` : "login please"}</h2>
    </div>
  );
}

export default Home;
