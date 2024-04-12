import Layout from "./Layout";
import classes from '../style/component.module.css'
import { useSession} from 'next-auth/react';
import {  useEffect, useState} from 'react';

export default function ChangeData({noChacnge}) {
  const [idTel, setIdTel] = useState([])
  
  const session = useSession() 
  const id = session.data?.user.id

  const getApiData = async () => {
    const response = await fetch(
      `http://localhost:4200/api/user/${id}`
    ).then((response) => response.json());

    setIdTel(response);
  };


  if(idTel.length === 0) {
    getApiData();
  }

  const responseTelefon = async () => {
    const telefon = document.getElementById('telefon')
    console.log(id)
    await fetch('http://localhost:4200/api/telefon', {
      method: 'POST',
      body: JSON.stringify({
        id: idTel[2].id,
        value: telefon.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    telefon.value = ''  
  }

  const responseTelegram = async () => {
    const telegram = document.getElementById('telegram')
    console.log(id)
    await fetch('http://localhost:4200/api/telefon', {
      method: 'POST',
      body: JSON.stringify({
        id: idTel[1].id,
        value: telegram.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    telegram.value = ''  
  }


  return (
    <Layout title="asdasd">
      <div className={classes.changeData}>
        <button className={classes.changeDataOut} onClick={noChacnge}></button>
        <div className={classes.changeDataForm}>
          <input id="telefon" type="text" className="form-control" placeholder="Номер телефона"/>
          <button className="btn btn-dark" onClick={responseTelefon}>Изменить</button>
        </div>
        <div className={classes.changeDataForm}>
          <input id="telegram" type="text" className="form-control" placeholder="Телеграм"/>
          <button className="btn btn-dark" onClick={responseTelegram}>Изменить</button>
        </div>
      </div>
    </Layout>
  )
}