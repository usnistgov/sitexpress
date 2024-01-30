export default function StepOne() {
	return (
		<div className="rowSet">
			{/*Section Header Rectangle */}
			<div className="rectangle2">
				<h1 className="section2titleText">
					<span>
						Step One: <br /> Project Information <br />
					</span>
					<span className="section2SubtitleText">
						Provide project details and assumptions for completing the analysis.
					</span>
				</h1>
			</div>

			{/*First Page input fields*/}
			<label className="textLabel1">
				Project Name <img className="infoButton1"></img>
				<input className="input1" placeholder="Enter Name Here" />
			</label>
			{/*Note: Project description cursor needs to be moved to beginning of input field*/}
			<label className="textLabel2">
				Project Description <img className="infoButton1"></img>{" "}
			</label>
			<input className="input2" placeholder="Enter Text Here" required />

			<label className="textLabel3">
				How many investment options (i.e., alternatives) are you considering? <img className="infoButton1"></img>
				<input className="input3" placeholder="Max Amount 5 + Base Cases" required />{" "}
			</label>

			<label className="textLabel4">
				Study Period In Years? (Maximum 25) <img className="infoButton1"></img>
				<input className="input4" placeholder="Enter Text Here" required />
			</label>

			<label className="textLabel5">
				Dollar values will be entered in: <img className="infoButton1"></img>{" "}
			</label>

			{/*NOTE: Radio Buttons do not work unless clicked above, needs to be fixed */}
			<label className="radioButtonLabel1"> Constant Dollars With Real Discount Rate</label>
			<input className="radioButton1" type="radio"></input>
			<label className="radioButtonLabel2">Current Dollars With Nominal Discount Rate </label>

			<ul className="textLabel6">
				{" "}
				<li>Real Discount Rate</li>
			</ul>
			<input className="radioButton2" type="radio"></input>
			<ul className="textLabel7">
				{" "}
				<li>Inflation Rate</li>
				<li>Nominal Discount Rate</li>
			</ul>

			<div>
				<input className="input5" placeholder="Enter % Here" required />
			</div>
			<div>
				<input className="input6" placeholder="Enter % Here" required />
			</div>
			<div>
				<input className="input7" placeholder="Enter % Here" required />
			</div>

			{/*calculator image to side*/}
			<img className="calculatorImage"></img>
		</div>
	);
}
