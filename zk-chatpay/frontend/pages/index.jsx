import styles from "../styles/InstructionsComponent.module.css";
import InstructionsComponent from "../components/InstructionsComponent";

export default function Home() {
  return (
    <div className={styles.container}>
    <header className={styles.header_container}>
      <h1>
        zk-chat
      </h1>
    </header>
    <img src="/zklogo.png" alt="zk-chat logo" className={styles.logo} />

  </div>
  );
}
