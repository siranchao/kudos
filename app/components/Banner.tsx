'use client'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import banner1 from '../../public/images/banner-1.jpg'
import banner2 from '../../public/images/banner-2.jpg'
import banner3 from '../../public/images/banner-3.jpg'
import styles from "../styles/home.module.css"

export default function Banner() {
    return (
        <Carousel>
            <Carousel.Item>
                <Image
                    className={styles.banner}
                    src={banner1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Encourage Peer-to-Peer Recognition</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className={styles.banner}
                    src={banner2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Share Your Appreciation</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className={styles.banner}
                    src={banner3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Celebrate Your Team Achievement</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
 
}
