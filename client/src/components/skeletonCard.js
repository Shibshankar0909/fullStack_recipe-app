import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard() {
    return (
        <div className='skeleton'><Skeleton count={8} containerClassName="flex-1" /></div>
    )
}

export default SkeletonCard
