import Layout from '../../../../components/Layout'
import HeaderPortal from '../../../../components/HeaderPortal';
import { useRouter } from 'next/router'
import classes from '../../../../style/header.module.css'


export default function Employee({employeeUser, employeeUserAtribut }) {
  const router = useRouter()
  let surname
  let telegram
  let telefon
  const userAtribut = employeeUserAtribut.filter( user => user.user_id === router.query.name)

  function defineKey() {
    for(let i = 0; i < userAtribut.length; i++) {
      if ( userAtribut[i].name === 'surname' ) {
        surname = userAtribut[i].value
      } else if ( userAtribut[i].name === 'telegram'){
        telegram = userAtribut[i].value
      } else if(userAtribut[i].name === 'telefon') {
        telefon = userAtribut[i].value
      }
    }
  }
  
  defineKey()

  return (
    <Layout title='RXCODE'>
      <HeaderPortal/>
      <main>
        <div className={classes.profile}>
          <div>
            <div className={classes.profileImage}></div>
          </div>
          <ul className="list-group">
            <li className="list-group-item">{employeeUser.filter( user => user.id === router.query.name)[0].first_name} {employeeUser.filter( user => user.id === router.query.name)[0].last_name} {surname}</li>
            <li className="list-group-item">Номер телефона: {telefon}</li>
            <li className="list-group-item">Телеграм: {telegram}</li>
            <li className="list-group-item">Почта: {employeeUser.filter( user => user.id === router.query.name)[0].email}</li>
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
        </div>
      </main>
    </Layout>
  )
}



Employee.getInitialProps = async () => {
  const responseUser = await fetch ('http://localhost:4200/api/user')
  const responseUserAtribut = await fetch ('http://localhost:4200/api/usersAtribut')
  const employeeUser = await responseUser.json()
  const employeeUserAtribut = await responseUserAtribut.json()

  return{
    employeeUser,
    employeeUserAtribut 
  }
}