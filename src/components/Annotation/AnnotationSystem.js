import React, { useState } from 'react';
import { HiOutlineAnnotation } from 'react-icons/hi'
import Annotation from "./Annotation.js"
import "./AnnotationSystem.css"

// TODO assess how we want to convey information about the object that uses the annotation system. 
// We need to standardize (maybe use a different structure?)
const AnnotationSystem = ({ type, info, addAnnotation, getAnnotations, deleteAnnotation }) => {

  const [textInputAnnotation, setTextInputAnnotation] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [annotationId, setAnnotatoinId] = useState(""); // do we care about this...?

  const [showInputAnnotation, setShowInputAnnotation] = useState(false);

  const [listAnnotations, setListAnnotations] = useState([]);


  // localStorage.username ? localStorage.username : null

  const handleShowAndLoad = (type, info, getAnnotations) => {
    setShowInputAnnotation(!showInputAnnotation)
    console.log("type: ",type,", info: ",info,", getAnnotations: ", getAnnotations,", showInputAnnotation: ",showInputAnnotation)
    if (!showInputAnnotation){
      getAnnotations(type, info, setListAnnotations, localStorage.username ? localStorage.username : null);
    }
  }

  return (
    <div className="annotationInput">

      {/* button to show or hide... could be a good place to make the query about the annotations... */}
      <button className='buttonShowAnnotation' onClick={
        () => handleShowAndLoad(type, info, getAnnotations)
      }>
        <HiOutlineAnnotation className='icon' />
      </button>
      {/* TODO think about whether the addition of annotations should be open without making an account... probably not? */}
      {showInputAnnotation &&
        <div className='areaAnnotation'>
          <div className='areaInputAnnotation'>
          <input
            type="text"
            placeholder={"Add annotation about " + type}
            name="AddAnnotation"
            id="AddAnnotation"
            className='annotation'
            value={textInputAnnotation}
            onChange={(e) => setTextInputAnnotation(e.target.value)} />
          <div className="add" onClick={isUpdating
            ? () => console.log("will try to update")
            : () => addAnnotation(
              type,
              info,
              textInputAnnotation,
              setTextInputAnnotation,
              setListAnnotations,
              localStorage?.username)
          }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
          </div>
          <div className='areaDisplayAnnotation'>
            {listAnnotations.map((item) => (
                <Annotation
                  key={item._id}
                  annotationInput={item.annotationInput}
                  info={item.info}
                  type={item.type}
                  user={item.user}
                  privacy={item.privacy}
                  // TODO (and think about more)
                  // updateMode={() => updateMode(item._id, item.text, localStorage?.username)}
                  deleteAnnotation={() => deleteAnnotation(item._id, item.type, item.info, setListAnnotations)}
                />
              ))}
          </div>
        </div>
      }
    </div>
  )
}


export default AnnotationSystem;
