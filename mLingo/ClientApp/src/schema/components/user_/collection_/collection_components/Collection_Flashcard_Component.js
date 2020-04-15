import React from 'react'
import { FaTrash } from 'react-icons/fa'



const Collection_Flashcard_Component = ({ set, remove, index, method = () => null, create = false  }) => {


    let isFirst = index;
    index++;

    if( index < 10 ){index = `0${index}`} ;

    const removeCard = () => {
        remove(set);
    }

    return (
        <div key={index} className="col-12 d-flex">
            <div className="flashcard col-5">
                <div className="flashcard--title">
                    <h2>card {index}</h2>
                    <h5>front</h5>
                </div>
                <div className="flashcard--body">
                    <input type="text" name='term' alt={isFirst} value={set.term} className="flashcard--def" placeholder="Term" onChange={method}></input>
                </div>
            </div>
            <div className="flashcard col-5">
                <div className="flashcard--title">
                    <h2>card {index}</h2>
                    <h5>back</h5>
                </div>
                <div className="flashcard--body">
                    <input type="text" alt={isFirst}  value={set.definition} name='definition' className="flashcard--def" placeholder="Definiton" onChange={method}></input>
                </div>
            </div>
            {
                create ? ( isFirst === 0 ?  null: <button onClick={removeCard}  className="remove-button"><FaTrash onClick={removeCard}/></button> ) : null
            }

        </div >
    );
};

export default Collection_Flashcard_Component;