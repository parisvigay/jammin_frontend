import './Footer.css'
import CopyrightIcon from '@mui/icons-material/Copyright'

export default function Footer() {
  return (
    <div className="footerContainer">
        <div className="footer">
            <div className="logoAndCopyright">
                <p id="footerLogo">Jammin</p>
                <p id="footerCopyrightP">Copyright <CopyrightIcon id="footerCopyright"/> 2023 Jammin</p>
            </div>
        </div>
    </div>

  )
}
