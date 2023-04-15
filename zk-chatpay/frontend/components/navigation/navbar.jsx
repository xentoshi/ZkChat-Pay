import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/">
				<img className={styles.logo} src="/logo.png"></img>
			</Link>
			<Link href="/chat">
				<button className="rounded-full bg-indigo-400 p-4">Chat</button>
			</Link>
			<Link href="/fund">
				<button className="rounded-full bg-indigo-400 p-4">Fund</button>
			</Link>
			<Link href="/funding">
				<button className="rounded-full bg-indigo-400 p-4">Funding</button>
			</Link>
			<ConnectButton />
		</nav>
	);
}
