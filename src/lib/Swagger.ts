import {createSwaggerSpec} from "next-swagger-doc"

export const getApiDocs = () => {
   const spec = createSwaggerSpec({
    apiFolder : "src/app/api",
    definition : {
      openapi : "3.0.0",
      info : {
        title : "Snapify Api Docs",
        version : "0.1.0"
      },
      components : {
        securitySchemes : {
          bearerAuth : {
            type : "http",
            scheme : "bearer",
            bearerFormat : "JWT"
          }
        }
      },
      security : []
    }
   })

   return spec
}