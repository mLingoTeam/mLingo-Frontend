import React from 'react'
import {
    Card, CardBody, CardTitle

} from 'reactstrap';

const UserCreateCard = (props) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle> Term </CardTitle>
                    <input name='Term' type="text" size="40" placeholder="Type here" value={props.set.card.Term} onChange={props.functioni} required />
                    <CardTitle> Description </CardTitle>
                    <input name='Definition' type="text" size="40" placeholder="Type here" value={props.set.card.Definition} onChange={props.functioni} required />
                    <button onClick={props.functionii}>Add</button>
                </CardBody>
            </Card>
        </div >
    );
};

export default UserCreateCard;