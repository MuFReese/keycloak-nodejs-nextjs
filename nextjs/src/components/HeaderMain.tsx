import classes from '../style/header.module.css'
import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Router from 'next/router';

export default function HeaderMain() {
  const session = useSession();
  console.log(session.data?.user.id)

  function entrance() {
    if(session.data?.user.id){
      Router.push('/portal')
    }
  }

  return(
    <nav className={classes.headerMain}>
      <h1 >RXCODE</h1>
      <div>
        <button 
        type="button"
        className="btn btn-dark"
        onClick={entrance}
        >Вход</button>
        <button
        type="button"
        className="btn btn-dark"
        onClick={() => signOut()}
        style={{margin: '0px 10px'}}
        >
        Выход
        </button>
        <button 
        type="button"
        className="btn btn-dark"
        onClick={() => signIn('keycloak')}
        >Авторизация</button>
      </div>
    </nav>
  )
}