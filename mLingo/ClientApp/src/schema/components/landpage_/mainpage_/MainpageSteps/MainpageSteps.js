import React from 'react';
import community from '../../../../../img/icon-community.svg'
import collection from '../../../../../img/icon-collections.svg'
import plan from '../../../../../img/icon-plan.svg'
import MainpageStep from './MainpageStep'

const MainpageSteps = () => {

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
        return <MainpageStep props={el}/>
    })

    return(
        <div className="steps__container">
            <h2 className="steps__title mainpage--title">here's how it works!</h2>
            <div className="steps__list">
                {steps_set}
            </div>
        </div>
    )
}

export default MainpageSteps;