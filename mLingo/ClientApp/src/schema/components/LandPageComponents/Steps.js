import React from 'react';
import community from '../../../img/icon-community.svg'
import collection from '../../../img/icon-collections.svg'
import plan from '../../../img/icon-plan.svg'
import Step from './Step'

const Steps = () => {

    const steps = [
        {
            title: "join our community!",
            desc: "interaction with other users will help you stay motivated",
            img:  community
        },
        {
            title: 'create collections',
            desc: "add your vocabulary and share your collections with other users",
            img: collection
        },
        {
            title: 'set up your learning plan',
            desc: "set up your learning plan that will help you practice on a daily basis",
            img: plan
        }
    ]

    const steps_set = steps.map( el => {
        return <Step props={el}/>
    })

    return(
        <div id="Steps">
            <h2 className="mt-5">here's how it works!</h2>
            <div id="Steps-container" className="mt-5">
                {steps_set}
            </div>
        </div>
    )
}

export default Steps;