import React, { useEffect, useState } from 'react'
import CustomSelect from '../Select/Select'

import CurrencyCode from "../Header/CountryWithCurrencyCode.json";
import { useDispatch, useSelector } from 'react-redux'
import { conversionRate, currencySymbol } from "../../../Redux/Slices/user.slice";
import { callApiGetMethod } from '../../../Redux/Actions/api.action'
import { APIURL } from '../../../Utils'
import toaster from '../Toast';


const CurrencyDropdown = () => {
    const code: any = CurrencyCode

    const dispatch: any = useDispatch()

    const [selectOption, setSelectOption] = useState([])
    const [conversion_Rate, setConversionRate] = useState([])

    const selectedCurrency = useSelector((state: any) => state?.user?.currencySymbol);
    useEffect(() => {
        const handleConversionRate = async () => {
            const result = await dispatch(callApiGetMethod(APIURL.GET_EXCHANGE_RATE, {}, false, false))
            if (result?.statusCode === 200) {
                setConversionRate(result?.data[0])
            } else if (result?.statusCode === 400) {
                toaster.error(result?.message)
            }
        }

        const handleOption = code.map((data: any, index: any) => ({
            label: data.currency_code,
            value: data.currency_code
        }))


        handleConversionRate()
        setSelectOption(handleOption)
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (Object.keys(conversion_Rate).length > 0) {
            let conversion = conversion_Rate['rate']
            dispatch(conversionRate(conversion[selectedCurrency]))
        }
        // eslint-disable-next-line 
    }, [selectedCurrency])
    return (
        <div>
            <CustomSelect
                className="country_Dropdown"
                id="currency"
                placeholder={"Select currency"}
                name={"currency"}
                isClearable={false}
                isSearchable={true}
                options={selectOption}
                defaultValue={{ value: selectedCurrency, label: selectedCurrency }}
                onChange={(option: any) => dispatch(currencySymbol(option?.value))}
                value={selectedCurrency && {label: selectedCurrency}}
            />
        </div>
    )
}

export default CurrencyDropdown