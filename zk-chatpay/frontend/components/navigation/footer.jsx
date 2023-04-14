import styles from '../../styles/InstructionsComponent.module.css';

// create a footer component
export default function Footer () {
    return (
        <footer className="footer">
        <div className="container">
            <div className="content has-text-centered">
            <div className={styles.footer}>
				
				<h2 className='text-center'>Made with ❤️ ZK-ChatPay team </h2>
			</div>
            </div>
        </div>
        </footer>
    );
};