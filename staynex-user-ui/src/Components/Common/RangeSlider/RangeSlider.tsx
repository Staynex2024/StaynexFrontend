import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./RangeSlider.scss"

const RangeSlider = ({data, minValue, maxValue}) => {

    // const [minValue, set_minValue] = useState(25);
    // const [maxValue, set_maxValue] = useState(75);
    // const handleInput = (e) => {
    //     set_minValue(e.minValue);
    //     set_maxValue(e.maxValue);
    // };

    return (
        <>
            <MultiRangeSlider
                min={0}
                max={100}
                step={5}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                    data(e);
                }}
            />
        </>
    )
}

export default RangeSlider