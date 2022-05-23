import styles from '../styles/pets.module.css'
import NavBarInstance from "../component/NavbarInstance";
import Footer from "../component/Footer";
import {useState} from "react";
import Head from "next/head";
import Card from "../component/card";
import Image from "next/image";

export async function getStaticProps(context) {

    const res = await fetch(`${process.env.API_HOST}/api/pets`);
    const petData = await res.json();

    return {
        props: {
            petData
        }
    }
}

const Pets = (props) => {

    const [activeKey, setActiveKey] = useState(null);

    return (
        <div className={styles.container}>

            <Head>
                <title>所有宠物</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBarInstance appearance="subtle" activeKey={activeKey} onSelect={setActiveKey}/>

            <main className={styles.main}>

                {props.petData.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <div className={styles.cardLayout}>
                            {props.petData.map(petData => {

                                const {petId:id, name, pictureHash: imgUrl} = petData;

                                return <Card
                                    key={id}
                                    name={name}
                                    imgUrl={`${imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}`}
                                    href={`/pets/${id}`}
                                    className={styles.card}
                                />
                            })}
                        </div>
                    </div>)}
            </main>

            {/*<Footer/>*/}

        </div>
    )
};

export default Pets;