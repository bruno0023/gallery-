import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import type { Photo } from "../contexts/photo/models/photo";
import PhotoNavigator from "../contexts/photo/components/photo-navigator";
import ImagiePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";

export default function PagePhotoDetails() {

    const { albums, isLoadingAlbums } = useAlbums()

    const photo = {
        id: '1',
        title: 'Por do Sol',
        imageId: 'portrait-tower.png',
        albums: []
    } as Photo;

    return (
        <Container>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingAlbums ? (
                    <Text as='h2' variant="heading-large">{photo?.title}</Text>
                ) : (
                    <Skeleton className="w-48 h-8" />
                )}

                <PhotoNavigator loading={isLoadingAlbums} />
            </header>

            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-3">
                    {!isLoadingAlbums ? (
                        <ImagiePreview src={`/images/${photo?.imageId}`} title={photo?.title} imageClassName="h-84" />
                    ) : (
                        <Skeleton className="h-84" />
                    )}

                    {!isLoadingAlbums ? (
                        <Button variant='destructive'>Excluir Foto</Button>
                    ) : (
                        <Skeleton className="w-32 h-8" />
                    )}

                </div>

                <div className="py-3">
                    <Text as='h3' variant="heading-medium" className='mb-6'>Albums</Text>
                    <AlbumsListSelectable photo={photo} albums={albums} loading={isLoadingAlbums} />
                </div>
            </div>
        </Container>
    )
}