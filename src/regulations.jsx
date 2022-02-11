import React,{useEffect} from 'react';
import RegulationCard from './regulation-card'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import './regulation.scss'
export default function Regulations() {
  
    return (
     <div className="regulation-container">
         {/* Regulations */}
         <RegulationCard/>
         <RegulationCard/>
         <RegulationCard/>
         <RegulationCard/>
         <RegulationCard/>
         <RegulationCard/>
         <RegulationCard/>
         <RegulationCard/>
         {/* <RegulationCard/> */}
     </div>
    );
}