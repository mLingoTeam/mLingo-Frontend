import React, { useRef, useEffect } from 'react'
import { ReactComponent as Profile } from '../../../../img/icon-profile.svg';
import gsap from 'gsap';

export default function IconProfile() {

    const wrapper = useRef(null);

    useEffect( () => {
        const [elements] = wrapper.current.children;
        const that = elements.querySelector('.getThat');
        const circle = elements.querySelector('.theCircle');
        const tl = gsap.timeline({defaults: { ease: 'power3.inOut'}});

        gsap.set([that.children, circle], { autoAlpha: 0 })
        tl.fromTo(circle, { scale: 0 }, {scale: 1, duration: 0.4, autoAlpha:1})
        .fromTo(that.children ,{x: "+=100", scale: 10}, {duration: 1, x: "-=100", scale:1, autoAlpha: 1, stagger: 0.2})
     }, [])

    return (
        <div className="ml-5" ref={wrapper} >
            <Profile />
        </div>
    )
}
