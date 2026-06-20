import React from "react";
import { useParams } from "react-router";

//Componentes
import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import PhotoNavigator from "../contexts/photo/components/photo-navigator";
import ImagiePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhoto from "../contexts/photo/hooks/use-photo";
import type { Photo } from "../contexts/photo/models/photo";


export default function PagePhotoDetails() {

    const { id } = useParams();
    const { photo, nextPhotoId, previousPhotoId, isLoadingPhoto, deletePhoto } = usePhoto(id);
    const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();
    const { albums, isLoadingAlbums } = useAlbums()

    function handleDeletePhoto() {
        setIsDeletingPhoto(async () => {
            await deletePhoto(photo!.id)
        }
        )
    }

    if (isLoadingPhoto && !photo) {
        return <div>Foto nao encontrada</div>
    }

    return (
        <Container>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingAlbums ? (
                    <Text as='h2' variant="heading-large">{photo?.title}</Text>
                ) : (
                    <Skeleton className="w-48 h-8" />
                )}

                <PhotoNavigator previousPhotoId={previousPhotoId} nextPhotoId={nextPhotoId} loading={isLoadingAlbums} />
            </header>

            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-3">
                    {!isLoadingAlbums ? (
                        <ImagiePreview src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`} title={photo?.title} imageClassName="h-84" />
                    ) : (
                        <Skeleton className="h-84" />
                    )}

                    {!isLoadingAlbums ? (
                        <Button variant='destructive' onClick={handleDeletePhoto} disabled={isDeletingPhoto}>
                            {isDeletingPhoto ? 'Deletando...' : 'Deletar Foto'}
                        </Button>
                    ) : (
                        <Skeleton className="w-32 h-8" />
                    )}

                </div>

                <div className="py-3">
                    <Text as='h3' variant="heading-medium" className='mb-6'>Albums</Text>
                    <AlbumsListSelectable photo={photo as Photo} albums={albums} loading={isLoadingAlbums} />
                </div>
            </div>
        </Container>
    )
}