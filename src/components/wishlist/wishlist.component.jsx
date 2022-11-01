import React from "react";
import "./wishlist.styles.css";


const WishListAndLikes = ({children, buttonType, ...otherProps}) => {
    
    return (
        <section id="wishlist-page">
            <div className="main-box">
                  <div className="main-head">
                    <h1 className="main-head-content">My Wishlist</h1>
                  </div>
                  <div className="box">
                      {/* {% if wishlist %} */}
                      <div className="inside-box">
                          <div className="sub-head">
                              <div><span>All</span><span id="wish1" style={{fontSize:"15px",fontWeight:"normal"}}> (3) items</span></div>
                              <div className="wish2"><span style={{fontSize:"15px",fontWeight:"normal"}}>1 of 3 pages</span></div>
                          </div>
                          <div className="body-row">
                              {/* {% for i in wishlist  %} */}
                              <a href="{% url 'product_:product_detail_' i.category.slug i.slug %}" className="">
                                  <div className=" card wish-card" data-index="{{ i.id }}">
                                      {/* {% for image in i.product_images.all %} */}
                                      {/* {% if image.is_main %} */}
                                      <div className="card-img">
                                          <img src="{{ image.images.url }}" alt="{{ image.images.alt_text }}" />
                                      </div>
                                      <div className="card-text">
                                          <strong className="title">hdhs</strong>
                                          {/* {% if i.discount_price != 0 %} */}
                                          <span>
                                              <strong className="discount_price">123 </strong>
                                              <strike className="price" style={{color:"#ACADA8"}}>109 </strike>
                                          </span>
                                          {/* {% else %} */}
                                          <strong className="price">300 </strong>
                                          {/* {% endif %} */}
                                      </div>
                                      <button className="remove-wishlist" data-index="{{ i.id }}"><i className="fa fa-trash" style={{fontWeight:"500",fontSize:"25px",color:"var(--normalwhite)"}}></i></button>
                                      {/* {% endif %} */}
                                      {/* {% endfor %} */}
                                  </div>
                              </a>
                              {/* {% endfor %} */}
                          </div>
                      </div>
                      {/* {% else %} */}
                      <div className="empty">
                        <p>No products have been added to your wishlist yet</p>
                      </div>
                      {/* {% endif %} */}
        
        
                      <h1 className="">My Likes</h1>
                      {/* {% if likes %} */}
                      <div className="inside-box">
                          <div className="sub-head">
                              <div><span>All</span><span id="likes1" style={{fontSize:"15px",fontWeight:"normal"}}> (4) items</span></div>
                              <div className="likes2"><span style={{fontSize:"15px",fontWeight:"normal"}}>1 of 3 pages</span></div>
                          </div>
                          <div className="body-row">
                              {/* {% for i in likes  %} */}
                              <a href="{% url 'product_:product_detail_' i.category.slug i.slug %}" className="">
                                  <div className="card like-card" data-index="{{ i.id }}">
                                      {/* {% for image in i.product_images.all %} */}
                                      {/* {% if image.is_main %} */}
                                      <div className="card-img">
                                          <img src="{{ image.images.url }}" alt="{{ image.images.alt_text }}"/>
                                      </div>
                                      <div className="card-text">
                                          <strong className="title">weqr</strong>
                                          {/* {% if i.discount_price != 0 %} */}
                                          <span>
                                              <strong className="discount_price">435 </strong>
                                              <strike className="price" style={{color:"#ACADA8"}}>333 </strike>
                                          </span>
                                          {/* {% else %} */}
                                          <strong className="price">104 </strong>
                                          {/* {% endif %} */}
                                      </div>
                                      <button className="add-like" data-index="{{ i.id }}"><i className="fa fa-trash" style={{fontWeight:500,fontSize:"25px",color:"var(--normalwhite)"}}></i></button>
                                      {/* {% endif %} */}
                                      {/* {% endfor %} */}
                                  </div>
                              </a>
                              {/* {% endfor %} */}
                          </div>
                      </div>
                      {/* {% else %} */}
                      <div className="empty">
                        <p>You like no item</p>
                      </div>
                      {/* {% endif %} */}
                  </div>
            </div>
        </section>
)}
export default WishListAndLikes;