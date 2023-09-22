import css from "./button.module.css"
import { Component } from "react";

export default  class Button extends Component {


     handleClick = () => {

        this.props.loadMorePages();
     }
     render() {
        return (

            <button type="button" className={css.button} onClick={this.handleClick}>Load More</button>
        )
    }

     }

