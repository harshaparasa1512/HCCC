import { MenuItem, MenuList, Paper } from '@mui/material';
import { CustomSelect } from '../StyledComponents/StyledFields';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './leftMenu.module.scss'
import FormControl from '@mui/material/FormControl';

const LeftMenu = () => {
    return (
        <div>
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    defaultValue=""
                    id="grouped-select"
                    placeholder='Select pooja Type'>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </CustomSelect>
            </FormControl>
            <div>
                <FormControl className={styles.dropDowns}>
                    <CustomSelect
                        IconComponent={KeyboardArrowDownIcon}
                        className={styles.dropDownSelect}
                        defaultValue=""
                        id="grouped-select"
                        placeholder='Select pooja Type'>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </CustomSelect>
                </FormControl>
            </div>
        </div>
    )
}

export default LeftMenu;
