import "./defcss.css"
import "./Button.css"
export default function Button({info,color}){
    return(
        <><button style={{backgroundColor:color}}>{info}</button>
        </>
    )
}