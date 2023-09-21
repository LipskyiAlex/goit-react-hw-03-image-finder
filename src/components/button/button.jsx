import css from "./button.modules.css"
import { Component } from "react";

export default  class Button extends Component {


     handleClick = () => {

        this.props.loadMorePages();
     }
     render() {
        return (

            <button type="button" className="Button" onClick={this.handleClick}>Load More</button>
        )
    }

     }

