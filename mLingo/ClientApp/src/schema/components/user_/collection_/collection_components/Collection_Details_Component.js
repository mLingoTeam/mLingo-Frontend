import React from './node_modules/react'
import {
 CardBody, CardTitle

} from './node_modules/reactstrap';
import Square from '../../../../../img/collection.svg'

const Collection_Details_Component = (props) => {
    return (
        <div className="createCollection col-12">
            <div>
                <CardBody className="d-flex flex-nowrap">
                    <div className="flashsquare"><img src={Square} /></div>
                    <div>
                        <CardTitle> Title </CardTitle>
                        <input name="collectionTitle" type="text" size="45" placeholder="Type here" value={props.set.collectionTitle} onChange={props.handleChange} required />
                        <CardTitle> Description </CardTitle>
                        <textarea name="collectionDescription"  rows="5" cols="45" placeholder="Type here" onChange={props.handleChange} value={props.set.collectionDescription} required />
                        <div>
                            <button onClick={props.set.functionii} class="green-button"> { props.edit ? "edit collection" : "create collection" } </button>
                            <button className="green-button"> add to the study set </button>
                        </div>
                    </div>
                </CardBody>
            </div>
        </div >
    );
};

export default Collection_Details_Component;