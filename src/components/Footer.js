import React from 'react';
import './Footer.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="Footer">
        Developed by Leon Kwan, Michael Yu, Raymond Yu, and Venkat Pamulapati
        <div className="Social">
            <FontAwesomeIcon icon={faGithub} className="Github" onClick={() => window.open("https://github.com/ray7yu/sheltr", "_blank")}/>
        </div>
    </div>
  );
}

export default Footer;