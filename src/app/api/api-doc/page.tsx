import { getApiDocs } from "@/lib/Swagger";
import ReactSwagger from "./next-swagger";

export default async function IndexPage() {
    const apiDocs = await getApiDocs();
    return (
        <ReactSwagger
            spec={apiDocs}
        />
    )
}