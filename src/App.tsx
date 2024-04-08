// import "./App.css";
import { useState } from "react";
import Disclaimer from "./components/Disclaimer";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepTwo from "./components/StepTwo";

import "./grid.css";
import "./index.css";

function App() {
	const [project, setProject] = useState({
		projectName: "",
		projectDesc: "",
		alts: 1,
		studyPeriod: 1,
		dollarValue: "constant",
		realDR: 3,
		inflationRate: 2.3,
		nominalDR: 5.3,
		costs: [],
		altNames: {},
	});
	const [result, setResult] = useState({});
	console.log(project);
	// @ts-ignore
	const handleChange = (key: string, e) => {
		if (key === "studyPeriod" || key === "alts") {
			setProject({ ...project, [key]: +e });
		} else {
			setProject({ ...project, [key]: e.target.value });
		}
		if (key === "refresh") {
			setProject({ ...project, realDR: 3, inflationRate: 2.3, nominalDR: 5.3 });
		}
	};

	const handleNameChange = (id: number, e) => {
		setProject((prevProject) => ({
			...prevProject,
			altNames: {
				...prevProject.altNames,
				[`alt${id}`]: e.target.value,
			},
		}));
	};

	return (
		<div className="App">
			<Header />
			<LandingSection />
			<StepOne project={project} handleChange={handleChange} handleNameChange={handleNameChange} />
			<StepTwo project={project} getResults={setResult} />
			<StepThree project={project} results={result} />
			<Disclaimer />
		</div>
	);
}

export default App;
