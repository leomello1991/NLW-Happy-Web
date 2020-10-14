import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {Map, TileLayer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanagesMap.css'


function OrphanagesMap() {
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Map"/>

          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estãoesperando a sua visita :)</p>
        </header>
        
        <footer>
          <strong>Franca</strong>
          <span>São Paulo</span>
        </footer>

      </aside>

      <Map 
        center={[20.5302073,-47.4392362]}
        zoom={13}
        style={{width:'100%', height:'100%'}}
      >
      {/* <TileLayer url= "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}

        <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />
      </Map>
        <Link to ="" className="create-orphanage">
          <FiPlus size={32} color="#FFFFFF"/>
        </Link>
    
   </div>
  );
}

export default OrphanagesMap