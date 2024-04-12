import Layout from '../../../components/Layout'
import HeaderPortal from '../../../components/HeaderPortal';
import { useSession} from 'next-auth/react';
import {  useState} from 'react';
import classes from '../../../style/header.module.css'
import ChangeData from '../../../components/ChangeData';



export default function PersonalArea({personalArea}) {
  const [user, setUsers] = useState([])
  const [addChangeBlock, setAddChangeBlock] = useState(false)
  const [focus, setFocus] = useState(false)
  let telegram
  let telefon
  let surname

  const session = useSession()
  const userData = session.data?.user

  const getApiData = async () => {
    const response = await fetch(
      `http://localhost:4200/api/user/${userData?.id}`
    ).then((response) => response.json());

    setUsers(response);
  };

  
  if(user.length === 0) {
    getApiData();
  }

  function defineKey() {
    for(let i = 0; i < user.length; i++) {
      if ( user[i].name === 'surname' ) {
        surname = user[i].value
      } else if ( user[i].name === 'telegram'){
        telegram = user[i].value
      } else if(user[i].name === 'telefon'){
        telefon = user[i].value
      }
    }
  }

  defineKey()  
  
  function changeData() {
    setAddChangeBlock(true)
  }
  function noChangeData() {
    setAddChangeBlock(false)
  }

  function focusInput() {
    setFocus(true)
  }
  // 
  function onMouseInput() {
    setFocus(false)
  }

  function search() {

  }
  
  return(
    <Layout title={'RXCODE'}>
            {addChangeBlock ? <div style={{zIndex: '1', position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: '0.3'}}></div> : ''}
      <HeaderPortal/>
      <main>
        {addChangeBlock ? <ChangeData noChacnge={noChangeData}/> : ''}
        <div className={classes.profile}>
          <div>
            <div className={classes.profileImage}></div>
            <button className="btn btn-dark mt-3" onClick={changeData}>Изменить данные</button>
          </div>
          <ul className="list-group">
            <li className="list-group-item">{userData?.name} {user.length === 0 ? '' : surname}</li>
            <li className="list-group-item">Номер телефона: {user.length === 0 ? '' : telefon}</li>
            <li className="list-group-item">Телеграм: {user.length === 0 ? '' : telegram}</li>
            <li className="list-group-item">Почта: {userData?.email}</li>
            <li className="list-group-item">Департамент RX CODE - по клику открывать структуру RX CODE</li>
            <li className="list-group-item">Текущая должность</li>
            <li className="list-group-item">Непосредственный руководитель, возможность перехода к карточке</li>
            <li className="list-group-item">Непосредственный HR, возможность перехода к карточке</li>
            <li className="list-group-item">Зарплата</li>
            <li className="list-group-item">Процент премии</li>
            <li className="list-group-item">Отпуск</li>
            <li className="list-group-item">Статус сотрудника</li>
            <li className="list-group-item">Статус графика работы сотрудника</li>
            <li className="list-group-item">Дата выхода на работу</li>
            <li className="list-group-item">Ревьюшные листы</li>
            <li className="list-group-item">Кадровые формы</li>
            <li className="list-group-item">Место в офисе</li>
            <li className="list-group-item">Баллы "Спасибо"</li>
          </ul>
          <div>

            {/* Тут я еще не доделал */}
            <input type="text" onKeyUp={search} onFocus={focusInput} className="form-control" style={{width:'200px', marginLeft: '30px'}} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder='Поиск сотрудников'/>
            {focus === true? <ul style={{border: '1px solid black', zIndex: '1'}}>
              {personalArea.map( user => (
                <li  key={user.id}>
                  <a href={`/portal/corporatepage/personalarea/${user.id}`}>{user.first_name} {user.last_name}</a>
                </li>
              ))}
            </ul> : ''}
          </div>
        </div>
      </main>
    </Layout>    
  )
}



PersonalArea.getInitialProps = async () => {
  const response = await fetch ('http://localhost:4200/api/user')
  const personalArea = await response.json()

  return{
    personalArea
  }
}