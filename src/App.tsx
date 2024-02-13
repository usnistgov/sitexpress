// import "./App.css";
import { useState } from "react";
import Disclaimer from "./components/Disclaimer";
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
		alts: 2,
		studyPeriod: 1,
		dollarValue: "constant",
		realDR: "3",
		inflationRate: "2.3",
		nominalDR: "5.3",
	});

	const handleChange = (key: string, e) => {
		setProject({ ...project, [key]: e.target.value });
	};

	return (
		<div className="App">
			<LandingSection />
			<StepOne project={project} handleChange={handleChange} />
			<StepTwo project={project} />
			<StepThree project={project} />
			<Disclaimer />
		</div>
	);
}

export default App;
