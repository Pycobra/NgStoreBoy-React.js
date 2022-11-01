import React from 'react';
//import {useParams, Link, useLocation, useMatch, useNavigate,} from "react-router-dom";
import Directory from '../../components/directory-menu/directory-menu.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
//import ReactDOM from 'react-dom/client';
import "./homepage.styles.css"


 const Homepage = ({isCollectionFetching}) => {
    return (
        <div className='homepage'>
            <div className='home-image'></div>
            <div className='home-body'>
                {/* <Directory page="isHomepage"/> */}
                <CollectionOverview isCollectionFetching={isCollectionFetching}/>
            </div>
        </div>
    )
 };

 export default Homepage;
