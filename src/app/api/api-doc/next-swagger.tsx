"use client";
import 'swagger-ui-react/swagger-ui.css'
import SwaggerUI from 'swagger-ui-react'

function ReactSwagger ({spec} : {spec : any}) {
    return <SwaggerUI spec={spec}/>
}

export default ReactSwagger