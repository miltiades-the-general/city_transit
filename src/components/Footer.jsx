import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from '@/styles/Home.module.css';
import styles2 from "./footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
    return (
    <div className={styles.footerContainer}>
    <footer className={styles2.footer}>
      <div className={styles2.container}>
        <div className={styles2.row}>
          <div className={styles2.col_md_2}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </div>
          <div className={styles2.col_md_8}>
            <ul className={styles2.footer_links}>
              <li><a href="https://www.linkedin.com/in/ben-gunnels-61a00b242/">Linkedin</a></li>
              <li><a href="https://github.com/miltiades-the-general">Github</a></li>
              <li><a href="https://ben-gunnels-portfolio.vercel.app/">Personal Portfolio</a></li>
              <li><a href="https://leetcode.com/miltiades-the-general/">Leet Code</a></li>
              <li><a href="https://www.hackerrank.com/miltiadesgeneral">Hacker Rank</a></li>
            </ul>
          </div>
          <div className={styles2.col_md_2}>
            <p className={styles2.footer_date}>{currentYear}</p>
          </div>
        </div>
        <div className={styles2.row}>
          <div className={styles2.col_md_12}>
            <p className={styles2.footer_trademark}>© 2023 Benjamin Gunnels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
    )
}

export default Footer;