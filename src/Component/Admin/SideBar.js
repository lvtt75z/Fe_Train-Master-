import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SideBar = (props) => {
    return (
        <div>
            <ProSidebar>
                <Menu>
                    <SubMenu label="Charts">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                        <MenuItem> Documentation </MenuItem>
                        <MenuItem> Calendar </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    );
}

export default SideBar;
