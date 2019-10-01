import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import SearchBar from '../SearchBar/SearchBar';
import styles from './styles.module.css'


const Header = () => {
    return (
        <div className={styles.headerMenu}>
            <Link to="/" className={styles.logo}>
                 elrim.
            </Link>
            <SearchBar/>
            <div className={styles.menu}>
                <Link className={styles.browse} to="/" >
                    Browse
                </Link>
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;