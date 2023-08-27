import styles from '../styles/about.module.css'
import { Metadata } from 'next';
import Image from 'next/image'
import logo from '@/public/images/RPDUlogo.jpg'
 
export const metadata: Metadata = {
  title: 'Kudos | About Us',
  description: 'Kudos About Us Page',
};



export default function About() {

    
    return (
        <div className={styles.aboutPage}>
            <div className={styles.about}>
					<div className={styles.logo}>
                        <Image src={logo} alt="rpdu-logo" width={300} height={300} className={styles.image}/>
					</div>

					<div className={styles.info}>
						<h4> About Kudos App</h4>
						<p>This application is designed and developed by Rapid Prototype Design Unit (RPDU), Enterprise Technology Delivery, GovTechON using MERN stack</p>
						<p> Version: 1.0.0.0 </p>
						<p> Developers: </p>
						<ul>
							<li>Siran Cao - <a href="mailto:siran.cao@ontario.ca">siran.cao@ontario.ca</a></li>
							<li>Abhi Joshi - <a href="mailto:abhi.joshi@ontario.ca">abhi.joshi@ontario.ca</a></li>
							<li>Xin Lyu - <a href="mailto:xin.lyu@ontario.ca">xin.lyu@ontario.ca</a></li>
						</ul>
						<hr />
						<h4>Feedback</h4>
						<p><a href="https://web.yammer.com/main/org/ontario.ca/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiI5MDY1ODczNDA4MCJ9/new" target="_blank" rel="noreferrer">Join our community</a> on yammer to learn more about low-code and Power-Apps</p>
						<br />
						<p>If you have any feedbacks please send to <a href="mailto:rpdu@ontario.ca">rpdu@ontario.ca</a>, your opinion is valuable to us!</p>
					</div>
				</div>
        </div>
    )
}