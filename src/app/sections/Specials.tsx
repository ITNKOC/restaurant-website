"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import SpecialsItem from "../components/SpecialsItem";
import "./specials.css";
import Preloader from "../components/Preloader";

// Il serait bon de définir des types/interfaces pour vos données
// par exemple :
// interface Filter {
//   id: number;
//   name: string;
//   active: boolean;
// }
// interface SpecialItemData { // Remplacez par la structure réelle de vos items
//   id: number; // Assurez-vous que cela correspond au type de id utilisé dans les comparaisons
//   // ... autres propriétés de l'item
//   active?: boolean; // Si 'active' est ajouté dynamiquement
// }

export default function Specials() {
  const [data, setData] = useState</*SpecialItemData[] | */ any[]>([]); // Précisez le type de data si possible
  const [items, setItems] = useState</*SpecialItemData[] | */ any[]>([]); // Précisez le type d'items si possible
  const [filters, setFilters] = useState([
    {
      id: 1,
      name: "Chef's Signature Pasta",
      active: true,
    },
    {
      id: 2,
      name: "Seasonal Risotto",
      active: false,
    },
    {
      id: 3,
      name: "Wood-Fired Pizza",
      active: false,
    },
    {
      id: 4,
      name: "Weekend Selection",
      active: false,
    },
    {
      id: 5,
      name: "Family Platters",
      active: false,
    },
  ]);

  const getSpecialsData = () => {
    fetch("http://localhost:3000/api/specials")
      .then((res) => res.json())
      .then((data) => setData(data)) // setData(data as SpecialItemData[]) si vous avez défini l'interface
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getSpecialsData();
  }, []);

  useEffect(() => {
    setItems(data);
  }, [data]); // Corrigé ici

  const handleFilterActive = (id: number) => {
    const updatedFilters = filters.map((filter) => ({
      ...filter,
      active: filter.id === id,
    }));
    setFilters(updatedFilters);
  }; // Corrigé ici également pour la cohérence et éviter une future erreur

  const handleSpecialChange = (id: number) => {
    handleFilterActive(id);
    // Note: Assurez-vous que 'item.id' dans vos données 'items' est aussi un nombre
    // pour que la comparaison 'item.id === id' fonctionne comme prévu.
    // Si 'item.id' peut être d'un autre type (ex: string),
    // vous devrez ajuster la logique ou le type de 'id'.
    const updatedItems = items.map((item: any) => ({
      // Précisez le type de 'item' si possible
      ...item,
      active: item.id === id,
    }));
    setItems(updatedItems);
  };

  return (
    // ... le reste de votre code JSX ...
    <section id="specials" className="specials">
           {" "}
      <div className="container" data-aos="fade-up">
               {" "}
        <SectionTitle title="Our Specialties" subtitle="Chef's Selection" />   
           {" "}
        <div
          className="specials-description text-center"
          data-aos="fade-up"
          data-aos-delay="50"
        >
                   {" "}
          <p>
                        Experience our chef's carefully crafted specialties that
            capture the             essence of traditional Italian cuisine with
            a modern twist.          {" "}
          </p>
                 {" "}
        </div>
               {" "}
        <div className="row" data-aos="fade-up" data-aos-delay="100">
                   {" "}
          <div className="col-lg-12 mb-4">
                       {" "}
            <div className="specials-tabs-wrapper">
                           {" "}
              <ul className="specials-tabs">
                               {" "}
                {filters.map((filter) => (
                  <li className="specials-tab-item" key={filter.id}>
                                       {" "}
                    <a
                      className={`specials-tab-link ${
                        filter.active ? "active" : ""
                      }`}
                      onClick={() => handleSpecialChange(filter.id)}
                    >
                                            <span>{filter.name}</span>         
                               {" "}
                    </a>
                                     {" "}
                  </li>
                ))}
                             {" "}
              </ul>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <div
          className="row specials-content"
          data-aos="fade-up"
          data-aos-delay="200"
        >
                   {" "}
          <div className="col-lg-12">
                       {" "}
            <div className="tab-content">
                           {" "}
              {!items ? ( // ou items.length === 0, car items est initialisé à []
                <Preloader />
              ) : items.length > 0 ? (
                items.map((item: any) => (
                  <SpecialsItem key={item.id} item={item} />
                )) // Précisez le type de 'item' si possible
              ) : (
                <Preloader /> // Peut-être un message "Pas d'items" ici si data est vide après chargement
              )}
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <div
          className="specials-footer text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
                   {" "}
          <p>
                        All specials are prepared daily with fresh ingredients.
            Specials may             vary based on seasonal availability.      
               {" "}
          </p>
                   {" "}
          <div className="specials-cta">
                       {" "}
            <a href="#book-a-table" className="btn-book">
                            Reserve Your Table            {" "}
            </a>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </section>
  );
}
