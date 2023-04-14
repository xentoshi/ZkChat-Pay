import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="/">
				<img className={styles.logo} src="/logo.png"></img>
			</a>
			<ConnectButton />
		</nav>
	);
}
