import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonSearch() {
    return (
        <div className='skSearch'>
            <div className="circle">
                <Skeleton highlightColor='gray' circle height={50} />
            </div>
            <div className="line">
                <Skeleton highlightColor='gray' height={10} count={2} />
            </div>
        </div>
    )
}

export default SkeletonSearch
