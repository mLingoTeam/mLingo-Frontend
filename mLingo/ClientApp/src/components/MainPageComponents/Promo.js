import React from "react";
import { Media } from "reactstrap";
import img1 from "../../img/books.png";
import "./Promo.css";
const Promo = props => {
  return (
    <div className="offset-1 col-10 Promo">
      <Media list>
        <Media tag="li">
          <Media left href="#">
            <img src={img1} className="img-media" />
          </Media>
          <Media body>
            <Media heading>Media heading</Media>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
            in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
            nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            <Media></Media>
          </Media>
        </Media>
        <Media tag="li">
          <Media body>
            <Media heading>Media heading</Media>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
            scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum
            in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
            nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </Media>
          <Media right href="#">
            <img src={img1} className="img-media" />
          </Media>
        </Media>
      </Media>
    </div>
  );
};

export default Promo;
