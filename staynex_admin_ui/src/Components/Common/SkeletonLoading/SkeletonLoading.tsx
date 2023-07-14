import React from 'react'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoading = (props: any) => {
    return (

        props.field.map((item, index) => {
            return <tr key={item}>
                <td>{<Skeleton />}</td>
                <td>{<Skeleton />}</td>
                <td>{<Skeleton />}</td>
                <td>{<Skeleton />}</td>
                <td>{<Skeleton />}</td>
                <td>{<Skeleton />}</td>
            </tr>

        })
    )
}

export default SkeletonLoading