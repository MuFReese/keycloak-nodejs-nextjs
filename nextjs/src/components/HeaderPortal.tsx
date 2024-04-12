
import Link from 'next/link';
import classes from '../style/header.module.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


export default function HeaderPortal() {


  return(
    <>
      <nav className={classes.headerPortal}>
        <h1><a href="/portal">RXCODE</a></h1>
        <div className={classes.headerPortalConteiner}>
          <a href='/portal/newsletters' className={classes.headerPortalLink}>Новостные рассылки</a>
          <a href='/portal/baseknow' className={classes.headerPortalLink}>База знаний</a>
          <a href='/portal/newsline' className={classes.headerPortalLink}>Лента новостей</a>
          <a href='/portal/schefaoffice' className={classes.headerPortalLink}>Схефа офиса</a>
          <Dropdown as={ButtonGroup}>
            <Button variant="success" href='/portal/corporatepage'>Корпоративная страница</Button>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="/portal/corporatepage/personalarea">Личный кабинет</Dropdown.Item>
              <Dropdown.Item href="/portal/corporatepage/organizationalstructure">Организационная структура</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  )
}