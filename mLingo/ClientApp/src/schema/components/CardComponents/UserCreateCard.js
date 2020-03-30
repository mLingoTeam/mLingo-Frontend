import React from 'react'
import {
    Card, CardBody, CardTitle

} from 'reactstrap';
import Square from '../../../img/collection.svg'

const UserCreateCard = (props) => {
    return (
        <div className="createCard">
            <div>
                <CardBody className="d-flex flex-nowrap justify-content-center">
                    <div className="flashsquare"><img src={Square} /></div>
                    <div>
                        <CardTitle> Term </CardTitle>
                        <input name='term' type="text" size="40" placeholder="Type here" value={props.set.card.term} onChange={props.functioni} required />
                        <CardTitle> Description </CardTitle>
                        <input name='definition' type="text" size="40" placeholder="Type here" value={props.set.card.definition} onChange={props.functioni} required />
                        <button onClick={props.functionii}>Add</button>
                    </div>
                </CardBody>
            </div>
        </div >
    );
};

export default UserCreateCard;