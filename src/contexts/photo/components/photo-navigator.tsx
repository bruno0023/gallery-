import ButtonIcon from "../../../components/button-icon";
import Skeleton from "../../../components/skeleton";
import cx from "classnames";

//Icones
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react"
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react"
import Button from "../../../components/button";
import { useNavigate } from "react-router";

interface PhotoNavigatorProps extends React.ComponentProps<"div"> {
    previousPhotoId?: string,
    nextPhotoId?: string,
    loading?: boolean
}

export default function PhotoNavigator({
    previousPhotoId,
    nextPhotoId,
    loading,
    className,
    ...props
}: PhotoNavigatorProps) {

    const navigator = useNavigate()

    return (
        <div className={cx("flex gap-2", className)} {...props} >
            {!loading ? (
                <>
                    <ButtonIcon
                        icon={ArrowLeftIcon}
                        variant='secondary'
                        disabled={!previousPhotoId}
                        onClick={() => navigator(`/fotos/${previousPhotoId}`)}
                    />
                    <Button
                        icon={ArrowRightIcon}
                        variant='secondary'
                        disabled={!nextPhotoId}
                        onClick={() => navigator(`/fotos/${nextPhotoId}`)}
                    >
                        Próxima imagem
                    </Button>
                </>
            ) : (
                <>
                    <Skeleton className="w-10 h-10" />
                    <Skeleton className="w-20 h-10" />
                </>
            )}

        </div>
    )
}