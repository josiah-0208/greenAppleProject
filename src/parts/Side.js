import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSearchEnterState } from "../store";
import "./Side.css";

function Side(props) {

    let [tagName] = useState(['봄', '여름', '가을', '겨울']);
    let [tagColor, setTagColor] = useState(["#864924","#864924","#864924","#864924"]);
    let reduxstate = useSelector((state) => { return state });

    useEffect(() => {
        if (sessionStorage.getItem('tab') === '0') {
            setTagColor(["#bad80a","#864924","#864924","#864924"])
        } else if (sessionStorage.getItem('tab') === '1') {
            setTagColor(["#864924","#bad80a","#864924","#864924"])
        } else if (sessionStorage.getItem('tab') === '2') {
            setTagColor(["#864924","#864924","#bad80a","#864924"])
        } else if (sessionStorage.getItem('tab') === '3') {
            setTagColor(["#864924","#864924","#864924","#bad80a"])
        } else {
            setTagColor(["#864924","#864924","#864924","#864924"])
        }
    }, [reduxstate.headerOnClickState, reduxstate.keyword, reduxstate.searchEnterState])
    

    return (
        <div className="container_side">
            {
                tagName && tagName.map((v, i) => {
                    return (<Tag tagName={tagName[i]} key={i} 
                        index={i} setTagState={props.setTagState} setTagColor={setTagColor}
                        tagColor={tagColor}/>)
                })
            }
        </div>
    )
}

function Tag(props) {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let reduxState = useSelector((state) => { return state })

    let tagName = ""
    if (props.tagName === "봄") {
        tagName = "spring"
    } else if (props.tagName === "여름") {
        tagName = "summer"
    } else if (props.tagName === "가을") {
        tagName = "fall"
    } else if (props.tagName === "겨울") {
        tagName = "winter"
    }
    
    return (
        <div className="tag_title">
            <span onClick={() => {
                let copy = ["#864924","#864924","#864924","#864924"]
                copy[props.index] = "#bad80a";
                props.setTagColor(copy);
                navigate('/'+tagName)
                props.setTagState(props.index);
                sessionStorage.setItem('tab',props.index)
                dispatch(changeSearchEnterState(0));
            }} style={{color: props.tagColor[props.index]}}>
                {props.tagName}
            </span>
        </div>
    )
}

export default Side;