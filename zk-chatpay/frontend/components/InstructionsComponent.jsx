import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";

const plant = "https://giphy.com/embed/ZzuUZRMcRv7oRtV79K"

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
				Become a planetary gardener
				</h1>
				<h2> Our Lovely, Lovely World, a platform to directly & anonymously donate to reforestation projects </h2>
				<iframe src={plant} width="250" height="250" frameBorder="0" title="plant" className='plant' allowFullScreen></iframe>

				<button>launch marketplace</button>
			</header>
		</div>
	);
}
