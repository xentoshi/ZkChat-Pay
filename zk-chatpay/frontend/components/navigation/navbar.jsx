import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="/">
				<img className={styles.logo} src="/logo.png"></img>
			</a>
			<a href="/chat">
				<button className="rounded-full bg-indigo-400 p-4">Chat</button>
			</a>
			<a href="/fund">
				<button className="rounded-full bg-indigo-400 p-4">Fund</button>
			</a>
			<a href="/funding">
				<button className="rounded-full bg-indigo-400 p-4">Funding</button>
			</a>
			<ConnectButton />
		</nav>
	);
}
