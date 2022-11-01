import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AppleSvg } from '../asset/apple.svg';
import { ReactComponent as GooglePlaySvg } from '../asset/google-play.svg';
import { ReactComponent as ShoppingCartSvg } from '../asset/shopping-cart1.svg';
import { ReactComponent as StarSvg } from '../asset/star.svg';
import { ReactComponent as TwitterSvg } from '../asset/twitter.svg';
import { ReactComponent as FaceBookSvg } from '../asset/facebook.svg';
import "./popup-header.styles.css";

const Popup = ({children}) => {
    return (
        <div className="pop-up">
            <div className='pop-up-content'>{children}</div>
        </div>
    )
    // return (
    //     <div class="first">
    //         <div id="dropdown-accounto">
    //             <span id="account-caret2"><i class="fa fa-caret-up"></i></span>
    //             <ul>
    //                <li class="account">
    //                     {
    //                         currentUser ? (
    //                             <a><button onClick={() => auth.signOut()}><ShoppingCartSvg className="logo shopping-cart" />Sign Out</button></a>
    //                             // <div className="option" onClick={() => auth.signOut()}>
    //                             //     Sign Out
    //                             // </div>
    //                             )
    //                             :
    //                             (<a><button to="/registeration"><ShoppingCartSvg className="logo shopping-cart" />Sign In</button></a>
    //                             // <Link className="option" to="/registeration">
    //                             //     Sign In
    //                             // </Link>
    //                             )
    //                     }
    //                     {/* {% if request.user.is_authenticated %}
    //                    <a href="{% url "account_:logout" %}"><button><i class="fa fa-sign-out" style="color:var(--normalwhite)"></i>Sign Out</button></a>
    //                     {% else %}
    //                    <a href="{% url "account_:login" %}"><button><i class="fa fa-sign-in" style="color:var(--normalwhite)"></i>Sign in</button></a>
    //                     {% endif %} */}
    //                 </li>
    //                 <hr/>

    //                 {/* {% if request.user.is_authenticated %} */}
    //                 <li>
    //                     {/* <a href="{% url "account_:dashboard" %}"><i class="fa fa-dashboard" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"></i>My Dashboard</a> */}
    //                 </li>
    //                 <li>
    //                     {/* <a href="{% url "message_:messages_history" request.user.unique_id %}">
    //                         <span class="msg-block">
    //                             <i class="fa fa-envelope"></i>
    //                             {% if chats %}<span id="msg-no-top">{{chats}}</span>{% endif %}
    //                         </span>
    //                         Chats
    //                     </a> */}
    //                 </li>
    //                 {/* {% endif %}

    //                 <li><a href="{% url "account_:likes_and_wishlist" %}"><i class="fa fa-heart-o" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"></i>Saved & liked items</a></li> */}
    //                 <li><ShoppingCartSvg className="logo shopping-cart" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"/>Liked Items</li>
    //             </ul>

    //             <ul>
    //                <li class="account">
    //                     {
    //                         currentUser ? (
    //                             <a><button onClick={() => auth.signOut()}><ShoppingCartSvg className="logo shopping-cart" />Sign Out</button></a>
    //                             )
    //                             :
    //                             (<a><button to="/registeration"><ShoppingCartSvg className="logo shopping-cart" />Sign In</button></a>
    //                             )
    //                     }
    //                 </li>
    //                 <hr/>

    //                 {
    //                     currentUser ? (
    //                         <li>
    //                             <Link to="/"><ShoppingCartSvg className="logo shopping-cart" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"/>My Dashboard</Link>
    //                             {/* <a href="{% url "account_:dashboard" %}"><i class="fa fa-dashboard" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"></i>My Dashboard</a> */}
    //                         </li>
    //                         )
    //                 }

    //                 <li><a href="{% url "account_:likes_and_wishlist" %}"><i class="fa fa-heart-o" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"></i>Saved & liked items</a></li> */}
    //                 <li><ShoppingCartSvg className="logo shopping-cart" style="font-weight:600;margin-right:10px;font-size:20px;color:var(--normalblack)"/>Liked Items</li>
    //             </ul>
    //         </div>
    //     </div>
    // )
}
export default Popup;


