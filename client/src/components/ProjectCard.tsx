import { FC } from "react";
import style from "./ProjectCard.module.css";

const ProjectCard:FC = () => {
    return (
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src="./" alt="cap"/>
          <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#CV" className="btn btn-primary">Go somewhere</a>
         </div>
      </div>
    );
}

export default ProjectCard;
