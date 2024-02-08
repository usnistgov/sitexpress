import "./App.css";
import Disclaimer from "./components/Disclaimer";
import LandingSection from "./components/LandingSection";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepTwo from "./components/StepTwo";

import "./index.css";

function App() {
	return (
		<div className="App">
			<LandingSection />
			<StepOne />
			<StepTwo />
			<StepThree />
			<Disclaimer />
		</div>
	);
}

export default App;
