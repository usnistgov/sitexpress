import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import calcImg from './calculator.png';
import infoImg from './Icons.png';
import 'react-data-grid/lib/styles.css';
import DataGrid, {SelectColumn, textEditor, SelectCellFormatter }from 'react-data-grid';
import { Bar } from "react-chartjs-2";

const columns = [
  { key: 'year', 
    name: 'Year', 
    width: 'max-content',
  },
  { key: 'baseCase', 
  name: 'Base Case',
  width: 'max-content',
  editor:textEditor,
  },
  {
    key: 'blankSpace1',
    name: '',
    width: 'max-content',
    editor:textEditor
    /*summaryFormatter() {
      return <strong>Total</strong>;
    }*/
  },
  {
    key: 'alt1',
    name: 'Alt 1',
    width: 'max-content',
    editor:textEditor
  },
  {
    key: 'blankSpace2',
    name: '',
    width: 'max-content',
    editor:textEditor
  },
  {
    key: 'alt2',
    name: 'Alt 2',
    width: 'max-content',
    editor:textEditor
  },
  {
    key: 'blankSpace3',
    name: '',
    width: 'max-content',
    editor:textEditor
  }
]

const rows = [
  { year: '', baseCase: 'Cost',blankSpace1: 'Revenue',alt1:'Cost',blankSpace2:'Revenue', alt2:'Cost',blankSpace3:'Revenue'},
  { year: 'Initial Investment', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '1', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '2', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '3', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '4', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '5', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '6', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '7', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '8', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '9', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '10', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '11', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '12', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '13', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '14', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '15', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '16', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '17', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '18', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '19', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''},
  { year: '20', baseCase: '',blankSpace1: '',alt1:'',blankSpace2:'', alt2:'',blankSpace3:''}
]

const columns1 = [
  { key: 'blankSpace', 
    name: '', 
    width: 'max-content',
  },
  { key: 'baseCase', 
  name: 'Base Case',
  width: 'max-content',
  editor:textEditor,
  },
  {
    key: 'option1',
    name: 'Option 1',
    width: 'max-content',
    editor:textEditor
    /*summaryFormatter() {
      return <strong>Total</strong>;
    }*/
  },
  {
    key: 'option2',
    name: 'Option 2',
    width: 'max-content',
    editor:textEditor
  }
]

const rows1 = [
  { blankSpace: 'Net Present Value Profit', baseCase: '',option1: '',option2: ''},
  { blankSpace: 'Net Profit', baseCase: '',option1: '', option2:''},
  { blankSpace: 'IRR', baseCase: '',option1: '', option2:''},
  { blankSpace: 'Simple Payback', baseCase: '',option1: '', option2:''},
  { blankSpace: 'Discounted Payback', baseCase: '',option1: '', option2:''},
  { blankSpace: 'BCR', baseCase: '',option1: '', option2:''},
]
//import USWDS from "@uswds/uswds/src/js";

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
    
        {/*<a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
       */}
         
       
       <h1> <span className="section1titleText">SITExpress <br/></span> <span className= "section1titleText2">For Project Investment Analysis<br/></span> <span className= "section1titleText3">Powered by E3 https://e3.nist.gov/</span></h1>

       <div className="rectangle"> <h1 className="rectangleText">Smart Investment Tool Express (SITExpress) completes investment analysis based on NIST Advanced Manufacturing Series 200-5 to identify economical projects/investments.</h1> <h1 className="rectangleText2"> Calculated metrics include: <br/>
          &nbsp; &nbsp;&nbsp;&nbsp;  Net Present Value (NPV) <br/> 
          &nbsp; &nbsp;&nbsp;&nbsp; Internal Rate of Return (IRR) <br/> 
          &nbsp; &nbsp;&nbsp;&nbsp; Payback Period (PBP)</h1>  </div>

        <hr className="line1Section1"/>
        <hr className="line2Section1"/>


      {/*section1*/}
      <div className= "rowSet">
      <div className="rectangle2"> <h1 className= "section2titleText"> <span>Step One: <br/> Project Information <br/></span>  <span className='section2SubtitleText'>Provide project details and assumptions for completing the analysis.</span></h1>
      </div>
      <label className= "textLabel1">Project Name <img className='infoButton1' src={infoImg}></img>
      <input className='input1' placeholder="Enter Name Here"/>
      </label>
      
      <label className= "textLabel2">Project Description <img className='infoButton1' src={infoImg}></img> </label>
      <input className='input2'placeholder="Enter Text Here"/>

      <label className= "textLabel3">How many investment options (i.e., alternatives) are you considering? <img className='infoButton1' src={infoImg}></img>
      <input className='input3' placeholder="Max Amount 5 + Base Cases
"/> </label>


      
      <label className= "textLabel4">Study Period In Years? (Maximum 25) <img className='infoButton1' src={infoImg}></img>
      <input className='input4' placeholder="Enter Text Here"/></label>
      <label className= "textLabel5">Dollar values will be entered in: <img className='infoButton1' src={infoImg}></img> </label>
      
      
      <label className="radioButtonLabel1"> Constant Dollars With Real Discount Rate</label>
      <input className="radioButton1" type="radio"></input>
      <label className="radioButtonLabel2">Current Dollars With Nominal Discount Rate </label>

      <ul className= "textLabel6"> <li>Real Discount Rate</li></ul>
      <input className="radioButton2" type="radio"></input>
      <ul className= "textLabel7"> <li>Inflation Rate</li>
      <li>Nominal Discount Rate</li></ul>
      

      <div><input className='input5' placeholder="Enter % Here"/></div>
      <div><input className='input6' placeholder="Enter % Here"/></div>
      <div><input className='input7' placeholder="Enter % Here"/></div>
      <img className= "calculatorImage" src={calcImg}></img>

      </div>
      <hr className="line1Section2"/>
      <hr className="line2Section2"/>
      <div>
      <div className="rectangle3"><h1 className="section3titleText"><span>Step Two:<br/> Annual Cost/ Revenue Data By Alternative <br/></span>  <span className='section2SubtitleText'>Provide the annual values costs and revenues for each alternative.</span> </h1></div>
      <DataGrid className='tableDesign' columns={columns} rows={rows} />
      </div>
      <hr className="line1Section3"/>
      <hr className="line2Section3"/>
      <div>
      <div className="rectangle4">
        <h1 className="section4titleText"> <span>Step Three:<br/> Results <br/></span> 
        <span><button className="largeButton">Run Results</button></span>
        <span className="section4subtitleText">Save to:</span>
        <span><button className="smallButton"> CSV</button> <button className="smallButton">PDF</button></span> </h1>
      </div>
      <DataGrid className='tableDesign2' columns={columns1} rows={rows1} />
      </div>
      <p className='footerText'>NIST-developed software is expressly provided "AS IS." 
        NIST MAKES NO WARRANTY OF ANY KIND, EXPRESS, IMPLIED, IN FACT OR ARISING BY OPERATION OF LAW, INCLUDING, WITHOUT LIMITATION, 
        THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT AND DATA ACCURACY. 
        NIST NEITHER REPRESENTS NOR WARRANTS THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. 
        NIST DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OF THE SOFTWARE OR THE RESULTS THEREOF, 
        INCLUDING BUT NOT LIMITED TO THE CORRECTNESS, ACCURACY, RELIABILITY, OR USEFULNESS OF THE SOFTWARE.
        </p>
      {/*
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      */}

    </div>
  )
}

export default App
