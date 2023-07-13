import React, { ReactNode } from 'react';
import './CommonHeading.scss';

const CommonHeading = ({ heading, centered, paragraph, }:
    { heading?: string | ReactNode, centered?: boolean, paragraph?: any }) => {
    return (
        <div className={`common_heading ${centered ? 'text-center' : ''}`}>
            <h2>{heading}</h2>
            {paragraph && <p>{paragraph}</p>}
        </div>
    )
}

export default CommonHeading;