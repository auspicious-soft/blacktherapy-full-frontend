import ReactLoading from 'react-loading';
import React from 'react'
interface ReactLoaderProps {
    color?: string;
}
const ReactLoader = (props: ReactLoaderProps) => {
    const { color = '#283c63' } = props;
    return <ReactLoading type={'spin'} color={color} height={'20px'} width={'20px'} />
}

export default ReactLoader