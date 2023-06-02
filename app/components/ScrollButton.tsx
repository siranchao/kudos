import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import styles from '../styles/homePage.module.css';


const isBrowser: boolean = typeof window !== "undefined"

export default function ScrollButton() {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled: number = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true)
		}
		else if (scrolled <= 300) {
			setVisible(false)
		}
	};

	const scrollToTop = () => {
		if (isBrowser) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	};
	if (isBrowser) {
		window.addEventListener('scroll', toggleVisible);
	}

	return (
		<div className={styles.scrollButton}>
			<FaArrowCircleUp onClick={scrollToTop}
				style={{
					display: visible ? 'inline' : 'none'
				}} />
		</div>
	);
}