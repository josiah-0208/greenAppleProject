import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Side.css";

function Side(props) {
    let [tagName] = useState(['봄', '여름', '가을', '겨울']);

    return (
        <div className="container_side">
            {
                tagName.map((v, i) => {
                    return (<Tag tagName={tagName[i]} key={i} 
                        index={i} setTagState={props.setTagState}/>)
                })
            }
        </div>
    )
}

function Tag(props) {
    let navigate = useNavigate();
    return (
        <div className="tag_title">
            <span onClick={() => {
                navigate('/'+props.tagName)
                props.setTagState(props.index);
            }}>
                {props.tagName}
            </span>
        </div>
    )
}

export default Side;