import { FC } from 'react';

import MainLogo from './MainLogo';
import SearchInput from './SearchInput';
import SignIn from './SignIn';

import style from './Header.module.css';

const Header:FC = () => {
  return (
    <div className={style.header}>
      <MainLogo />
      <SearchInput />
      <SignIn />
    </div>
  )
}

export default Header;