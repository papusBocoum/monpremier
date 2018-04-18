import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature,Popup } from "react-mapbox-gl";
import './App.css';
import axios from 'axios'
import papa from 'papaparse'
import { ZoomControl } from "react-mapbox-gl";







const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoib3VzbWFuZXBhcHVzIiwiYSI6ImNqZnVxZWdjdDAzZGoyeHFlMXNsZmp0ZXkifQ.AHCR_kdCAx6WNy2CD84W0Q"
});



class App extends Component {

    constructor(props){
        super(props)
        this.state={
            data:[],
            ok:'',
            contenu:[],
            year:1997
        }

    }


    componentDidMount(){





        let datas1;



        axios.get("african_conflicts2.csv")
            .then( response =>{




   const  datas = papa.parse(response.data)

                datas1 = datas;
   let contenu =[]
   for(let i=0;i<1000;i++){

       contenu[i]=datas1.data[i]


                }


   this.setState({
       data:contenu
   })



            })








    }
    colorGen=(string)=>{

        if (string.match("Riots")){
            return "blue"


        }
        if (string.match("Violence")){
            return "red"


        }
        if (string.match("strategic")){
            return "rebeccapurple"


        }
        if (string.match("remote")){
            return "coral"


        }
        if (string.match("Battle")){
            return "green"


        }
        return "yellow"

    }
    handleClick = (evt)=>{

        console.log(evt.feature.layer.id)
        let index=evt.feature.layer.id
        let copy = this.state.contenu;
        copy.push(this.state.data[index])

        this.setState({
            contenu:copy

        })

}

handleInput=(e)=>{


    this.setState({
        year: e.target.value
    })
}
  render() {
        let details;
        if (this.state.contenu.length<1){
            details = <tr><td className="vide">Click on a point to see its details</td></tr>

        }else{
            details= this.state.contenu.map(item=>
                <tr>
          <td className="triger">{item[0]}</td>
          <td className="desc">{item[1]} </td>
          <td className="event">{item[2]}</td>
          <td className="loc">{item[4]}</td>
          <td className="year">{item[6]}</td>
      </tr>
            )
        }



let contenu = this.state.data.map((item,index)=>



     <Layer key={index}
                      type="circle"
      id={""+index}
                      paint={{
                          "circle-radius":5,
                          "circle-color":this.colorGen(item[2]),
                          "circle-opacity":0.5
                      }}
      layout={{ "visibility":"visible" }}>

                       <Feature id={index} onClick={this.handleClick} coordinates={[parseFloat(item[5]), parseFloat(item[3])]}/>
</Layer>


)








    return (

      <div className="App">

          <div className="map">
               <Map
  style="mapbox://styles/ousmanepapus/cjfxmz13tcx012spj0qakqlyz"

  containerStyle={{
    height: "85vh",
    width: "50vw",

  }}  center={[17.5085,5.7832  ]} zoom={[2.5]} >

                   {contenu}

<ZoomControl/>

</Map>
              <div className="details">
  <table>
      <thead>
      <th className="triger">Trigger</th>
      <th className="desc">Description</th>
      <th className="event">Event-Type</th>
      <th className="loc">location</th>
      <th className="year">year</th>
      </thead>
      <tbody>

       {details}

       </tbody>

  </table>
              </div>


          </div>
           <div className="filters">
  <input value={this.state.year} onChange={this.handleInput} style={{width:"60%"}} type="range" min="1997" max="2017"/>
               <p>{this.state.year}</p>
               <select>
                   <option>Riots</option>
                   <option>Violence against civilians</option>
                   <option>Violence against civilians</option>
                   <option>Strategic planning</option>
                   <option>Remote</option>
                   <option>Riots</option>
               </select>
              </div>
          <div className="echarts">
              <div className="compare">

              </div>
              <div className="pie">

              </div>

          </div>


      </div>
    );
  }
}

export default App;
