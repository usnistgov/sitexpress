export default function LandingSection() {
	return (
		<>
			<h1>
				<span className="section1titleText">
					SITExpress <br />
				</span>
				<span className="section1titleText2">
					For Project Investment Analysis
					<br />
				</span>
				<span className="section1titleText3">Powered by E3 https://e3.nist.gov/</span>
			</h1>

			{/*Section Header Rectangle */}
			<div className="rectangle">
				<h1 className="rectangleText">
					Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced Manufacturing
					Series 200-5 to identify economical projects/investments.
				</h1>

				<h1 className="rectangleText2">
					{" "}
					Calculated metrics include: <br />
					&nbsp; &nbsp;&nbsp;&nbsp; Net Present Value (NPV) <br />
					&nbsp; &nbsp;&nbsp;&nbsp; Internal Rate of Return (IRR) <br />
					&nbsp; &nbsp;&nbsp;&nbsp; Payback Period (PBP)
				</h1>
			</div>
		</>
	);
}
