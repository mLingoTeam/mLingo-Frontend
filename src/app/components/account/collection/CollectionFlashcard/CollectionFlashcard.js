import React from 'react'
import { FaTrash } from 'react-icons/fa'



const CollectionFlashcardComponent = ({ set, remove = () => null, index, method, create = false  }) => {

    let isFirst = index;
    index++;

    if( index < 10 ){index = `0${index}`} ;
    const removeCard = () => remove(set);

    return (
        <div key={index} className="flashcard__container">
            <div className="flashcard__card">
                <div className="flashcard__info">
                    <div className="flashcard__number">card {index}</div>
                    <div className="flashcard__side">front</div>
                </div>
                <div className="flashcard__body">
                    { create ?<input className="flashcard__definition" type="text" name='term' alt={isFirst} value={set.term} placeholder="Term" onChange={method}/>:
                        (<div className="flashcard__definition definition--details" >{set.term}</div>)
                    }
                    </div>
            </div>
            <div className="flashcard__card">
                <div className="flashcard__info">
                    <div className="flashcard__number">card {index}</div>
                    <div className="flashcard__side">back</div>
                </div>
                <div className="flashcard__body">
                    { create ?< input className="flashcard__definition" type="text" alt={isFirst}  value={set.definition} name='definition' placeholder="Definiton" onChange={method}/>:
                        (<div className="flashcard__definition definition--details" >{set.definition}</div>)
                    }
                    </div>
            </div>
            {
                create ? ( isFirst === 0 ?  null: <button onClick={removeCard}  className="remove-button"><FaTrash onClick={removeCard}/></button> ) : null
            }

        </div >
    );
};

export default CollectionFlashcardComponent;