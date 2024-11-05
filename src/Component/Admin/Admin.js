import SideBar from './SideBar'
import NavBar from './NavBar';

const Admin = (props) =>{
    return(
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SideBar />
            </div>
            <div className='admin-content'>
                <NavBar />
            </div>
        </div>
    )
}
export default Admin;