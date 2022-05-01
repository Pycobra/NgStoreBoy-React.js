import React from "react";
import  "./card.styles.css";


export const Card = props => (
    <div className="card-container">
        <img alt={props.monster.name} src={`https://robohash.org/${props.monster.id}?set=set2`}></img>
        <h1>{props.monster.name}</h1>
    </div>
)