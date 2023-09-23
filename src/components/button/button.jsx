import css from "./button.module.css"
import { Component } from "react";

export default class Button extends Component {


     render() {
        return (

            <button type="button" className={css.button} onClick={this.props.loadMorePages}>Load More</button>
        )
    }

     }

