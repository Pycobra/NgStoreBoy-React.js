import React from 'react';
//import {useParams, Link, useLocation, useMatch, useNavigate,} from "react-router-dom";
import CollectionItem from '../collection-item/collection-item.component';
import "./collection-preview.styles.css"
import Directory from '../../components/directory-menu/directory-menu.component';




const CollectionPreview = ({name, items}) => {
    console.log(items)
    return (
        <div className="collection-preview">
            <h1 className='Title'>{name.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items.map(key => {
                        console.log(items[key])
                        return items[key]
                    })// .filter((itm, idx)=> idx < 4 )
                    .map(({id, ...otherItemsProps}) => (
                        // <Directory key={id} {...otherItemsProps} page="isHomepage"/> 
                        <CollectionItem key={id} {...otherItemsProps} />
                    ))
                }
            </div>
        </div>
    )
}
export default CollectionPreview;
