import React from 'react';
import "./sell.styles.css"
import { ReactComponent as StarSvg } from '../asset/shopping-bag.svg';

const SellPage = () => {
    return (
        <div className="sell-page" >
            <div className='inside'>
                <div className='box'><StarSvg  className="red" /><h1>Coming soon</h1></div>
                {/* <img alt='ffff' src={require('../media/daniel-storek.jpg')} /> */}
                {/* <h1>Coming soon</h1> */}
            </div>
        </div>
        )
}
export default SellPage;
