import { CirclesWithBar } from  'react-loader-spinner'
import css from "./loader.module.css"

const Loader = () => {

    return (

        <div className={css.loader}>

            <CirclesWithBar height="80"
        width="80"/> 

        </div>
    )
}

export default Loader;