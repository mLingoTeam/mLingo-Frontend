import React from 'react'
import {
    Card, CardBody, CardTitle

} from 'reactstrap';

const UserCreateCard = (set) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle> {set.term} </CardTitle>
                    <input name='Term' type="text" size="40" placeholder="Type here" minlength="1" required onChange={set.functioni} />
                    <CardTitle> {set.definition} </CardTitle>
                    <input name='Description' type="text" size="40" placeholder="Type here" minlength="1" required onChange={set.functioni} />
                    <button onClick={set.functionii}>Add</button>
                </CardBody>
            </Card>
        </div >
    );
};

export default UserCreateCard;