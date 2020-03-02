import React from 'react'
import {
    Card, CardBody, CardTitle

} from 'reactstrap';

const UserCreateCard = (set, functioni) => {
    return (
        <div>
            <Card>
            <CardBody>
                    <CardTitle> {set.term} </CardTitle>
                    <input name='term' type="text" size="40" placeholder="Type here" minlength="1" required onChange={set.functioni}/>
                    <CardTitle> {set.definition} </CardTitle>
                    <input name='description' type="text" size="40" placeholder="Type here" minlength="1" required onChange={set.functioni}/>
                </CardBody>
            </Card>
        </div >
    );
};

export default UserCreateCard;