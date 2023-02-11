import React from "react";
import logo from "../images/droppe-logo.png";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import styles from "../shopApp.module.css";

export default class Header extends React.Component<{}, {}> {

    render() {
        return <>
                <div className={styles.header}>
                    <div className={['container', styles.headerImageWrapper].join(' ')}>
                        <img src={logo} className={styles.headerImage} alt="Logo" />
                    </div>
                </div>

                <span className={['container', styles.imgContainer, styles.main].join(' ')}>
                    <img src={img1} className={styles.headerImg} alt="First Header" />
                    <img src={img2} className={styles.headerImg} alt="Second Header" />
                </span>
            </>;
    }
}
