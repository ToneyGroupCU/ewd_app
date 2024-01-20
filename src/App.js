// App.js
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { ewdPnt } from './calculations.js';

function App() {
    const [SD, setSD] = useState(50);
    const [ai, setAi] = useState(8);
    const [wavelength, setWavelength] = useState(1.57);
    const [ponix, setponix] = useState(5);
    const [poniy, setponiy] = useState(5);
    const [dtrx, setdtrx] = useState(50);
    const [dtry, setdtry] = useState(50);
    const [results, setResults] = useState([]);
    const [plotData, setPlotData] = useState([]);
    const [plotData1, setPlotData1] = useState([]);
    const [inx, setinx] = useState([]);
    const [plotBS, setplotBS] = useState([]);
    const [plotHS, setplotHS] = useState([]);
    const [plotLS, setplotLS] = useState([]);
    const [plotRS, setplotRS] = useState([]);
    const [plotCRS, setplotCRS] = useState([]);
    const [plotCLS, setplotCLS] = useState([]);

    function linspace(start, end, num) {
        const step = (end - start) / (num - 1);
        return Array.from({length: num}, (_, i) => start + step * i);
    }

    function ewd_pnt(SD, ai, cop, q0) {
        // let qi_hat = [-Math.cos(Math.PI*ai/180), 0, -Math.sin(Math.PI*ai/180)];
        let qi_hat = [-1, 0, 0];
        let qf_hat = [-SD, cop[0], cop[1]];
        let qout_hat = [Math.sin(Math.PI*ai/180), 0, Math.cos(Math.PI*ai/180)]
        // console.log(qf_hat)
    
        let norm = Math.sqrt(qf_hat[0] * qf_hat[0] + qf_hat[2] * qf_hat[2] + qf_hat[1] * qf_hat[1]);
        qf_hat = qf_hat.map(q => q / norm);
    
        let dq = qf_hat.map((qf, index) => q0 * (qf - qi_hat[index]));
        let qz = dq[0]*qout_hat[0]+dq[1]*qout_hat[1]+ dq[2]*qout_hat[2];
        let qxy;
    
        if (qf_hat[1] < 0) {
            qxy = -Math.sqrt(dq[0] * dq[0]+dq[1] * dq[1]+dq[2] * dq[2] - qz * qz);
        } else {
            qxy = Math.sqrt(dq[0] * dq[0]+dq[1] * dq[1]+dq[2] * dq[2] - qz * qz);
        }
        
    
        return [qxy, qz];
    }
  

    const handleCalculate = () => {
        const q0 = 2 * Math.PI / wavelength;
        // const cop = [25, 25]; // Example values, replace with actual logic
        // const result = ewdPnt(SD, ai, cop, q0);
        // setResults([...results, result]);


        let BS = new Array(200).fill(null).map(() => new Array(2).fill(0));
        let ind = 0;
        for (let i of linspace(-ponix, -ponix+dtrx, 200)) {
            let cop = [i, -poniy];
            BS[ind] = ewd_pnt(SD, ai, cop, q0);
            ind++;
        }


        const updateplotBS = {
            x: BS.map(row => row[0]),
            y: BS.map(row => row[1]),
            // x: BS[0],
            // y: BS[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' , size: 1},
        };
        setplotBS([updateplotBS]);

        let RS = new Array(200).fill(null).map(() => new Array(2).fill(0));
        let ind3 = 0;
        for (let i of linspace(-poniy, -poniy+dtry, 200)) {
            let cop = [dtrx-ponix,i];
            RS[ind3] = ewd_pnt(SD, ai, cop, q0);
            ind3++;
        }


        const updateplotRS = {
            x: RS.map(row => row[0]),
            y: RS.map(row => row[1]),
            // x: RS[0],
            // y: RS[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' , size: 1},
        };
        setplotRS([updateplotRS]);

        let CRS = new Array(200).fill(null).map(() => new Array(2).fill(0));
        let ind4 = 0;
        for (let i of linspace(-poniy, -ponix+dtry, 200)) {
            let cop = [0.0001,i];
            CRS[ind4] = ewd_pnt(SD, ai, cop, q0);
            ind4++;
        }


        const updateplotCRS = {
            x: CRS.map(row => row[0]),
            y: CRS.map(row => row[1]),
            // x: CRS[0],
            // y: CRS[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' , size: 1},
        };
        setplotCRS([updateplotCRS]);

        let CLS = new Array(200).fill(null).map(() => new Array(2).fill(0));
        let ind5 = 0;
        for (let i of linspace(-poniy, -poniy+dtry, 200)) {
            let cop = [-0.0001,i];
            CLS[ind5] = ewd_pnt(SD, ai, cop, q0);
            ind5++;
        }


        const updateplotCLS = {
            x: CLS.map(row => row[0]),
            y: CLS.map(row => row[1]),
            // x: CLS[0],
            // y: CLS[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' , size: 1},
        };
        setplotCLS([updateplotCLS]);

        let LS = new Array(200).fill(null).map(() => new Array(2).fill(0));
        let ind2 = 0;
        for (let i of linspace(-poniy, -poniy+dtry, 200)) {
            let cop = [-ponix, i];
            LS[ind2] = ewd_pnt(SD, ai, cop, q0);
            ind2++;
        }


        const updateplotLS = {
            x: LS.map(row => row[0]),
            y: LS.map(row => row[1]),
            // x: LS[0],
            // y: LS[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' , size: 1},
        };
        setplotLS([updateplotLS]);

        let HS = new Array(200).fill(null).map(() => new Array(2).fill(0));
        let ind1 = 0;
        for (let i of linspace(-ponix, -ponix+dtrx, 200)) {
            let cop = [i, dtry-poniy];
            HS[ind1] = ewd_pnt(SD, ai, cop, q0);
            ind1++;
        }


        const updateplotHS = {
            x: HS.map(row => row[0]),
            y: HS.map(row => row[1]),
            // x: BS[0],
            // y: BS[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' , size: 1},
        };
        setplotHS([updateplotHS]);


        // Prepare data for Plotly
        const updatedPlotData = {
            // x: results.map(r => r[0]),
            // y: results.map(r => r[1]),
            x: [-SD,-SD,-SD,-SD,-SD],
            y: [-ponix,dtrx-ponix,dtrx-ponix,-ponix,-ponix],
            z: [-poniy,-poniy,dtry-poniy,dtry-poniy,-poniy],
            type: 'scatter3d',
            mode: 'lines+markers',
            name: 'detector',
            marker: { color: 'blue' , size: 3},
        };

        setPlotData([updatedPlotData]);

        const updatedPlotData1 = {
            // x: results.map(r => r[0]),
            // y: results.map(r => r[1]),
            x: [5*Math.cos(Math.PI*ai/180),5*Math.cos(Math.PI*ai/180),-5*Math.cos(Math.PI*ai/180),-5*Math.cos(Math.PI*ai/180),5*Math.cos(Math.PI*ai/180)],
            y: [5,-5,-5,5,5],
            z: [-5*Math.sin(Math.PI*ai/180),-5*Math.sin(Math.PI*ai/180),5*Math.sin(Math.PI*ai/180),5*Math.sin(Math.PI*ai/180),-5*Math.sin(Math.PI*ai/180)],
            type: 'scatter3d',
            mode: 'lines+markers',
            name: 'sample',
            marker: { color: 'green', size: 3 },
        };

        setPlotData1([updatedPlotData1]);

        const updatedinx = {
          // x: results.map(r => r[0]),
          // y: results.map(r => r[1]),
          x: [SD,-SD],
          y: [0,0],
          z: [0,0],
          type: 'scatter3d',
          mode: 'lines+markers',
          name: 'Incident X-ray',
          marker: { 
            color: 'red', 
            size: 3
          },
      };

      setinx([updatedinx]);
    };


    return (
      <div>
          <div>
              <label>
                  Wavelength (A): {wavelength.toFixed(2)}
                  <input type="range" min="0.1" max="200" value={wavelength} onChange={(e) => setWavelength(parseFloat(e.target.value))} />
              </label>
          </div>
          <div>
              <label>
                  Sample Detector distance (cm): {SD.toFixed(2)}
                  <input type="range" min="1" max="100" value={SD} onChange={(e) => setSD(parseFloat(e.target.value))} />
              </label>
          </div>
          <div>
              <label>
                  Incident angle (degree): {ai.toFixed(2)}
                  <input type="range" min="0" max="90" value={ai} onChange={(e) => setAi(parseFloat(e.target.value))} />
              </label>
          </div>
          <div>
              <label>
                  poni_x (cm): {ponix.toFixed(2)}
                  <input type="range" min="0" max="100" value={ponix} onChange={(e) => setponix(parseFloat(e.target.value))} />
              </label>
          </div>
          <div>
              <label>
                  poni_y (cm): {poniy.toFixed(2)}
                  <input type="range" min="0" max="100" value={poniy} onChange={(e) => setponiy(parseFloat(e.target.value))} />
              </label>
          </div>
          <div>
              <label>
              dtrx (cm): {dtrx.toFixed(2)}
                  <input type="range" min="0" max="100" value={dtrx} onChange={(e) => setdtrx(parseFloat(e.target.value))} />
              </label>
          </div>
          <div>
              <label>
              dtry (cm): {dtry.toFixed(2)}
                  <input type="range" min="0" max="100" value={dtry} onChange={(e) => setdtry(parseFloat(e.target.value))} />
              </label>
          </div>
          <button onClick={handleCalculate}>Calculate</button>
          <Plot
              data={[...plotData, ...plotData1, ...inx]}
              
              // data={plotData}
              layout={{ width: 720, height: 440, title: 'GIWAXS Geometry' }}
          />
          <Plot
              data={[...plotBS,...plotHS,...plotLS,...plotRS,...plotCRS,...plotCLS]}
              
              // data={plotData}
              layout={{ width: 720, height: 440, title: 'Eward sphere correction',
              xaxis: {
                title: 'qxy (1/A)',
                // other x-axis configuration
            },
            yaxis: {
                title: 'qz (1/A)',
                // other y-axis configuration
            }, }}
          />
      </div>
  );
}


export default App;