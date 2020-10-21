import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import MapIcon from  "../utils/mapIcon";

import '../styles/pages/createOrphanage.css';
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function CreateOrphanage() {
 
  const history = useHistory()

  const [position,setPosition] = useState({latitude: 0, longitude: 0})
  const [name,setName] = useState<string>('')
  const [about,setAbout] = useState<string>('')
  const [instructions,setInstructions] = useState<string>('')
  const [opening_hours,setOpeningHours] = useState<string>('')
  const [open_on_weekends,setOpenOnWeekends] = useState<boolean>(true)
  const [images,setImages] = useState<File[]>([])
  const [previewImages,setPreviewImages] = useState<string[]>([])


  function handlemapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleselectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)
    
    const selectedImagesPreview = selectedImages.map(image=>{
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedImagesPreview)
  }
  
  async function handleSubmit (event: FormEvent){
    event.preventDefault();
    const {latitude, longitude} = position

    const data = new FormData()
    {
      data.append('latitude',String(latitude)) 
      data.append('longitude',String(longitude))
      data.append('name',name)
      data.append('about',about)
      data.append('instructions',instructions)
      data.append('opening_hours',opening_hours)
      data.append('open_on_weekends', String(open_on_weekends))

      images.forEach(image=>{
        data.append('images', image)
      })
    }

    const result = await api.post('/orphanages', data).then()
     
    alert(JSON.stringify(result))
    history.push('/app')
  }
  
  return (
    <div id="page-create-orphanage">
      
    <Sidebar/>
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-20.5374829,-47.4021358]} 
              style={{ width: '100%', height: 280 }}
              zoom={14.4}
              onclick={handlemapClick}
            >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />
              {position.latitude!== 0 && (
              <Marker 
                interactive={false} 
                icon={MapIcon} 
                position={[position.latitude,position.longitude]} />
              )}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                  id="name" 
                  value={name}
                  onChange={ event => { setName(event.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                  id="about" 
                  maxLength={300} 
                  value={about}
                  onChange={ event => { setAbout(event.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages.map((image,index)=>{
                    return(
                      <img key={index} src={image} alt={name}/>
                    )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input 
                    type="file" 
                    multiple 
                    id="image[]"
                    onChange={handleselectImages}/>             
            </div>

          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                    id="instructions" 
                    value={instructions}
                    onChange={ event => { setInstructions(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                    id="opening_hours" 
                    value={opening_hours}
                    onChange={ event => { setOpeningHours(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                    type="button" 
                    className={open_on_weekends ? "active" : ''}
                    onClick={()=>setOpenOnWeekends(true)}>
                      Sim
                </button>
                
                <button 
                      type="button"
                     className={!open_on_weekends ? "active" : ''}
                     onClick={()=>setOpenOnWeekends(false)}>
                      Não
                </button>

              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
