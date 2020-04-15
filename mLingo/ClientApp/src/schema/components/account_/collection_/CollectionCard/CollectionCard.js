import React from 'react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom'

const CollectionCardComponent = ({ set }) => {
    return (
        <div>
            <Link to="/collection/" onClick={ () => { localStorage.setItem("collectionid", set.id )} }>
                <Card>
                    <CardBody>
                        <CardTitle>{set.name}</CardTitle>
                        <CardSubtitle>Play Count: {set.playCount}</CardSubtitle>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
};

export default CollectionCardComponent;