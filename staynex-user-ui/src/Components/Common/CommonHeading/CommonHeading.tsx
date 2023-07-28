import React, { ReactNode } from 'react';
import './CommonHeading.scss';

const CommonHeading = ({ heading, centered, paragraph, className, }:
    { heading?: string | ReactNode, centered?: boolean, paragraph?: any, className?: any, }) => {
    return (
        <div className={`common_heading ${centered ? 'text-center' : ''} ${className}`}>
            <h2>{heading}</h2>
            {paragraph && <p>{paragraph}</p>}
        </div>
    )
}

export default CommonHeading;