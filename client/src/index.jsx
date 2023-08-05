import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Route,Routes } from 'react-router-dom'
import List from './components/List.jsx'

import { CloudinaryContext } from 'cloudinary-react';          


const App = () => {
  const [items, setItems] = useState([])
  const [designation, setdesignation] = useState("")
  const [price, setprice] = useState(0)
  const [client, setclient] = useState("")
  const [date1, setdate] = useState("")
  const [resultat, setresultat] = useState("")
  const [image, setimage] = useState("")
  const [reload, setreload] = useState(false)
  const [showApropos, setShowApropos] = useState(true);
  const [showListeanal, setShowListeanal] = useState(false);
  const [showSuivianal, setShowSuivianal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [show, setshow] = useState(false)
  useEffect(() => {
    //get all data 
    axios.get("/api/items/getAll")
      .then((res) => {
        console.log("response.data ", res.data)
        setItems(res.data)
      })
      .catch((err) => console.error(err))
  }, [reload])

  const search = (name) => {
    const searchTerm = name.toLowerCase();
      
    // If the search term is empty, reset the items list to the original list fetched from the server
    if (!searchTerm) {
      axios.get("/api/items/getAll")
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      // Filter the items based on the search term locally
      const filteredItems = items.filter((item) => item.design_an.toLowerCase().includes(searchTerm));
      setItems(filteredItems);
    }
  };
  
  const data={
    design_an:designation,
    price_an:price,
    resultat:resultat,
    image: image,
    Client: client,}
  
  const add =  () => { 
    axios.post("http://localhost:3000/api/items/add",data)
      .then((res) => {
        setreload(!reload)
      })
      .catch((err) => {
        console.log(designation,price,resultat,image,client)
        console.error('Error adding item:', err);
        
      });
  };
  const remove=(id)=>{
    axios.delete(`/api/items/${id}`)
    //(`/api/items/${itemId}`)
    .then((res)=>{
   setreload(!reload)
    })
    .catch((err)=>console.error(err))
  }
  

  const modify = (id) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'heni123'); 
  
      axios.post('https://api.cloudinary.com/v1_1/dtuvwldom/image/upload', formData)
      .then((response) => {
          const updatedItem = {
          resultat: resultat,
          image: response.data.secure_url,
        };
  
        axios.put("/api/items/" + id, updatedItem)
          .then((res) => setreload(!reload))
          .catch((err) => console.error(err));
      })
      .catch((error) => console.error('Error uploading image:', error));
  };
  
  return (
    <div>
      <div className="entete">
        <h1>Labo d'analyse</h1>
        <nav className="navbar">
          <a href="#" onClick={() => setShowApropos(true) || setShowListeanal(false) || setShowContact(false) || setShowSuivianal(false)}>
            À propos
          </a>
          <a href="#" onClick={() => setShowApropos(false) || setShowListeanal(true) || setShowContact(false)|| setShowSuivianal(false)}>
            Liste Analyse 
          </a>
          <a href="#" onClick={() => setShowApropos(false) || setShowListeanal(false) || setShowContact(false)|| setShowSuivianal(true)}>
            Suivi Analyse
          </a>
          <a href="#" onClick={() => setShowApropos(false) || setShowListeanal(false) || setShowContact(true)|| setShowSuivianal(false)}>
            Contact
          </a>
        </nav>
      </div>
      {showApropos && <Apropos />}
      {showListeanal && (<Listeanal  List={List} items={items} designation={designation} price={price} resultat={resultat} image={image} client={client} date1={date1} setdesignation={setdesignation} setprice={setprice}
          setresultat={setresultat} setimage={setimage}  setclient={setclient} setdate={setdate} remove={remove} modify={modify} add={add} setreload={setreload} reload={reload} search={search}
        show={show} setshow={setshow}  />
      )}
      {showSuivianal && (<Suivianal List={List} items={items} designation={designation} price={price} resultat={resultat} image={image} client={client} date1={date1} setdesignation={setdesignation} setprice={setprice}
          setresultat={setresultat} setimage={setimage}  setclient={setclient} setdate={setdate} remove={remove} modify={modify} add={add} setreload={setreload} reload={reload} search={search}
        show={show} setshow={setshow} />
      )}
      {showContact && <Contact />}
    </div>
  );

}

const Suivianal = ({ List,items,designation,price,resultat,image,client,date1, setdesignation, setprice, setresultat, setimage, setclient, setdate,add,remove, modify,show,setshow,reload,setreload,search }) => {
return(
  <div>
    <List items={items} />
    <h2>Ajout des Analyses</h2>
    <input placeholder="Designation" value={designation} onChange={(e) => setdesignation(e.target.value)} />
    <input placeholder="Prix" value={price} onChange={(e) => setprice(e.target.value)} />
    <input placeholder="Resultat" value={resultat} onChange={(e) => setresultat(e.target.value)} />
    <input placeholder="Image"  value={image} onChange={(e) => setimage(e.target.value)} />
    <input placeholder="Client" value={client} onChange={(e) => setclient(e.target.value)} />
    
    <button onClick={() => add( )}>Add</button>
    <br></br>
    
  </div>)};
const Listeanal = ({ List,items,designation,price,resultat,image,client,date1, setdesignation, setprice, setresultat, setimage, setclient, setdate,add,remove, modify,show,setshow,reload,setreload,search }) => {
  
  return (
    <div>
       <h2>Recherche des Analyses</h2>
    <input placeholder='Chercher une analyse' onChange={(e) => search(e.target.value)}></input>   
   
        <h2>Liste des Analyses</h2>
    <table>
        <thead>
          <tr>
          <th>id</th>
            <th>Designation</th>
            <th>Prix</th>
            <th>Client</th>
            <th>Resultat</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.idanalyse}>
              <td>{item.idanalyse}</td>
              <td>{item.design_an}</td>
              <td>{item.price_an}</td>
              <td>{item.Client}</td>
              <td>{item.resultat}</td>
              <td>{item.image} <img src={item.image} alt="Analyse Image" /></td>
              <td>
              
              <button onClick={() => remove(item.idanalyse)}>Delete</button>
              <button onClick={()=>setshow(!show)}>Modify</button>
     {show && <div>
       <input placeholder="Resultat" onChange={(e) => setresultat(e.target.value)} />
        <input placeholder="Image" type="file"  onChange={(e) => setimage(e.target.files[0])} />
        <button onClick={()=>{setshow(!show),modify(item.idanalyse)}}>DONE</button>
      </div>
      }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};



const Apropos=()=>(
<div id="apropos" className="carre-contenu">
  <p>
  Le laboratoire D'ANALYSE, laboratoire de biologie médicale du LAC MEDICAL CENTRE vous accueille dans un centre médical spécialisé sis aux berges du Lac 2 (à coté de la clinique internationale Hannibal) et comprenant la plupart des spécialités médicales, un centre de radiologie et une officine.
  Le biologiste responsable du laboratoire et son équipe souhaitent vous accueillir le mieux possible en vous vous garantissant une qualité de service optimale.

Le plateau technique du laboratoire assure une activité de biologie polyvalente comprenant les analyses de biochimie, hématologie, hémostase, immuno-hématologie, sérologie bactérienne et virale, microbiologie bactérienne et parasitologie. 
le laboratoire est ainsi spécialisé dans la biologie moléculaire et est équipé également par une paillasse de biologie moléculaire pour l'amplification du génome du VHB, VHC, HIV, Chlamydia trachomatis et Mycobacterium tuberculosis.
L’activité de biochimie est assurée par la chimie de Roche Diagnostics. L’activité d’hormonologie et de sérologie est assuré également par des automates de Roche diagnostics et de Biomérieux. Tous nos automates sont reliés en réseau avec le logiciel du laboratoire.
  </p>
  <h2>Services</h2>
  <ul>
      <li>Analyse au labo</li>
      <li>Prélévement à domicile</li>
      <li>Résultats accessible en ligne</li>
  </ul>
</div>
);
const Contact=()=>(
<div id="contact" className="section-contact">
            <h2>Contact</h2>
            <form method="get" action="">
                <div className="form-nom-email">
                    <div className="form-column">
                        <label for="nom">nom</label>
                        <input type="text" name="nom" id="nom" />
                    </div>
                    <div className="form-column">
                        <label for="email">email</label>
                        <input type="e-mail" name="email" id="email" />
                    </div>
                </div>
                <label for="message">message</label>
                <textarea name="message" id="message" rows="10"></textarea>
                <input type="submit" value="ENVOYER" className="cta" />
            </form>
        </div>);

ReactDOM.render(<App />, document.getElementById('app'))
