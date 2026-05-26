import { useParams } from "react-router";
import Text from "../components/text";

export default function PagePhotoDetails() {
    const { id } = useParams()

    return (
        <>
            <Text variant='heading-medium'>Foto Detalhes</Text>
            <hr />
            <Text variant='heading-medium'>id da foto: {id}</Text>
        </>
    )
}