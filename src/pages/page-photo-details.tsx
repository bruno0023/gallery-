import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import type { Photo } from "../contexts/photo/models/photo";
import PhotoNavigator from "../contexts/photo/components/photo-navigator";
import ImagiePreview from "../components/image-preview";
import Button from "../components/button";

export default function PagePhotoDetails() {

    //Apenas para testar o mock
    const isLoading = false
    const photo = {
        id: '1',
        title: 'Por do Sol',
        imageId: 'portrait-tower.png',
    } as Photo;

    return (
        <Container> 
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoading ? (
                    <Text variant="heading-large">{photo?.title}</Text>
                ): (
                    <Skeleton className="w-48 h-8" />
                )}

                <PhotoNavigator loading={isLoading} />
            </header>

            <div className="grid grid-cols-[21rem] gap-24">
                <div className="space-y-3">
                    {!isLoading ? (
                        <ImagiePreview src={`/images/${photo?.imageId}`} title={photo?.title} imageClassName="h-84"/>
                    ) : (
                        <Skeleton className="h-84" />
                    )}         

                    {!isLoading ? (
                        <Button variant='destructive'>Excluir Foto</Button>
                    ) : (
                        <Skeleton className="w-32 h-8" />
                    )}
                    
                </div>        
            </div>
        </Container>
    )
}