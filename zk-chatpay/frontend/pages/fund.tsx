import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import styles from "../styles/Home.module.css";
import type { ISuccessResult } from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import FundCard from "../components/FundCard";

export default function Home() {
	const handleProof = useCallback((result: ISuccessResult) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 3000);
			// NOTE: Example of how to decline the verification request and show an error message to the user
		});
	}, []);

	const [show,setShow] = useState(false);

	const onSuccess = (result: ISuccessResult) => {
		console.log(result);
		setShow(true);
	};

	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const storedProjects = JSON.parse(localStorage.getItem('projects'));
		if (storedProjects) {
		  setProjects(storedProjects);
		}
	  }, []);

	return (
		<div className={styles.container}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
				<IDKitWidget
					action="my_action"
					signal="my_signal"
					onSuccess={onSuccess}
					handleVerify={handleProof}
					app_id="app_staging_e77bb67150ed4393c95a024501a7d7cd"
				>
					{({ open }) => <button onClick={open} className="rounded-full p-4 bg-indigo-400">Sign in with Worldcoin</button>}
				</IDKitWidget>
			</div>
			{
				show && 
				<div className="grid gap-7 md:grid-cols-4">
					{projects.map((project, index) => (
						<FundCard
							key={index}
							title={project.title}
							description={project.description}
							image={project.imageUrl}
							isFunded = {project.isFunded}
							nameOfProject = {project.projectName}
							location={project.location}
							fundingNeeds={project.funding}
							room={project.room}
						/>
					))}
    			</div>
			}
		</div>
	);
}
