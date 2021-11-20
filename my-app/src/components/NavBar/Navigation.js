import NavLinks from './NavLinks'
import classes from './NavBar.Module.css'

const Navigation = (props) => {
  const {isHomeRouteMounted,isCartRouteMounted}=props
  return(
  <nav className={classes.Navigation}>
    <NavLinks  isHomeRouteMounted={isHomeRouteMounted} isCartRouteMounted={isCartRouteMounted}/>
  </nav>
)}

export default Navigation
