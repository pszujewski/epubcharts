import type { NextPage } from "next";
import EpubUpload from "../components/EpubUpload/EpubUpload";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<main>
				<EpubUpload />
			</main>
		</div>
	);
};

export default Home;
