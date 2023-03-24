import { useState } from 'react'
import './App.css'

//for calculator image
import calcImg from './calculator.png';
//for info button
import infoImg from './Icons.png';

//data table library
import 'react-data-grid/lib/styles.css';
import DataGrid, 
  {SelectColumn, 
    textEditor, 
    SelectCellFormatter 
  }from 'react-data-grid';

//bargraph library
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


//for bar graph
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ['Base Case', 'Alt 1', 'Alt 2'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Net Present Value - Profit',
      data: [8000,9000,10000],
      backgroundColor: 'rgba(0, 0, 240, 0.5)',
    },
  ],
};


//for datatable
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

//for second datatable
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


function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
         
        {/*******SECTION 1********/}

        {/*Section Title */}
       <h1> 
        <span className="section1titleText">SITExpress <br/></span> 
        <span className= "section1titleText2">For Project Investment Analysis<br/></span> 
        <span className= "section1titleText3">Powered by E3 https://e3.nist.gov/</span>
        </h1>

      {/*Section Header Rectangle */}  
       <div className="rectangle">

       <h1 className="rectangleText">Smart Investment Tool Express (SITExpress) 
       completes investment analysis based on NIST Advanced Manufacturing Series 
       200-5 to identify economical projects/investments.
       </h1> 

       <h1 className="rectangleText2"> Calculated metrics include: <br/>
          &nbsp; &nbsp;&nbsp;&nbsp;  Net Present Value (NPV) <br/> 
          &nbsp; &nbsp;&nbsp;&nbsp; Internal Rate of Return (IRR) <br/> 
          &nbsp; &nbsp;&nbsp;&nbsp; Payback Period (PBP)</h1>  
        
        </div>

        {/*Lines to separate sections */}
        <hr className="line1Section1"/>
        <hr className="line2Section1"/>


      {/*******SECTION 2********/}
      <div className= "rowSet">

       {/*Section Header Rectangle */}  
      <div className="rectangle2"> 
        <h1 className= "section2titleText"> 
        <span>Step One: <br/> Project Information <br/></span>  
        <span className='section2SubtitleText'>Provide project details and assumptions for completing the analysis.</span>
        </h1>
      </div>

      {/*First Page input fields*/}
      <label className= "textLabel1">Project Name <img className='infoButton1' src={infoImg}></img>
      <input className='input1' placeholder="Enter Name Here" />
      </label>
      {/*Note: Project description cursor needs to be moved to beginning of input field*/}
      <label className= "textLabel2">Project Description <img className='infoButton1' src={infoImg}></img> </label>
      <input className='input2'placeholder="Enter Text Here" required/>

      <label className= "textLabel3">How many investment options (i.e., alternatives) are you considering? <img className='infoButton1' src={infoImg}></img>
      <input className='input3' placeholder="Max Amount 5 + Base Cases" required/> </label>

      <label className= "textLabel4">Study Period In Years? (Maximum 25) <img className='infoButton1' src={infoImg}></img>
      <input className='input4' placeholder="Enter Text Here" required/></label>

      <label className= "textLabel5">Dollar values will be entered in: <img className='infoButton1' src={infoImg}></img> </label>
      
      {/*NOTE: Radio Buttons do not work unless clicked above, needs to be fixed */}
      <label className="radioButtonLabel1"> Constant Dollars With Real Discount Rate</label>
      <input className="radioButton1" type="radio"></input>
      <label className="radioButtonLabel2">Current Dollars With Nominal Discount Rate </label>

      <ul className= "textLabel6"> <li>Real Discount Rate</li></ul>
      <input className="radioButton2" type="radio"></input>
      <ul className= "textLabel7"> <li>Inflation Rate</li>
      <li>Nominal Discount Rate</li></ul>
      
      <div><input className='input5' placeholder="Enter % Here" required/></div>
      <div><input className='input6' placeholder="Enter % Here" required/></div>
      <div><input className='input7' placeholder="Enter % Here" required/></div>
      
      {/*calculator image to side*/}
      <img className= "calculatorImage" src={calcImg}></img>

      </div>

      {/*Lines to separate sections */}
      <hr className="line1Section2"/>
      <hr className="line2Section2"/>


      {/********SECTION 3*********/}
      <div>

      {/*Section Header Rectangle */}  
      <div className="rectangle3">
        <h1 className="section3titleText">
          <span>Step Two:<br/> Annual Cost/ Revenue Data By Alternative <br/></span>  
          <span className='section2SubtitleText'>Provide the annual values costs and revenues for each alternative.</span> 
          </h1>
      </div>

      {/*Data table */}
      <DataGrid className='tableDesign' columns={columns} rows={rows} />
      </div>

      {/*Lines to separate sections */}
      <hr className="line1Section3"/>
      <hr className="line2Section3"/>

       {/********SECTION 4********/}
      <div>

      {/*Section Header Rectangle */}    
      <div className="rectangle4">
        <h1 className="section4titleText"> <span>Step Three:<br/> Results <br/></span> 
        <span><button className="largeButton">Run Results</button></span>
        <span className="section4subtitleText">Save to:</span>
        <span><button className="smallButton"> CSV</button> <button className="smallButton">PDF</button></span> </h1>
      </div>

      {/*Creates Table */}
      <DataGrid className='tableDesign2' columns={columns1} rows={rows1} />

      {/*Bar Graph needs to be sized smaller and set to only appear after pressing run */}
      <Bar className= 'barGraphDesign' data={data} options={options} />
      </div>

    </div>
  )
}

export default App
