import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';
const Language = (props) => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'Tiếng Việt' : 'English'} id="basic-nav-dropdown" className='languages'>

                <NavDropdown.Divider />
                <NavDropdown.Item
                    onClick={() => { handleChangeLanguage('en') }}>
                    English
                </NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => { handleChangeLanguage('vi') }}
                // onClick={() => handleLogout(account)}
                >
                    Tiếng Việt
                </NavDropdown.Item>
            </NavDropdown>
        </>
    )
}
export default Language;