import React, { useEffect, useState} from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import api from '../services/api'




import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanagesMap.css'
import mapIcon from '../utils/mapIcon'


interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}


function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  
  
  useEffect(() => {
    api.get('orphanages').then(response =>{
      setOrphanages(response.data);
    })
  }, [])
  
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
    center={[-20.5302073,-47.4392362]}
    zoom={13}
    style={{width:'100%', height:'100%'}}
    >
    {/* <TileLayer url= "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
    
    <TileLayer
    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
    />
    
    {orphanages.map(orphanage => {
      return (
        <Marker
          key={orphanage.id}
          icon={mapIcon}
          position={[orphanage.latitude,orphanage.longitude]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
            <Link to= {`/orphanages/${orphanage.id}`}>
              <FiArrowRight size={15} color="FFF"/>
            </Link>
          </Popup>
        
        </Marker>
        )
      })}
      </Map>
      <Link to ="/orphanages/create" className="create-orphanage">
      <FiPlus size={32} color="#FFFFFF"/>
      </Link>
      
      </div>
      );
    }
    
    export default OrphanagesMap