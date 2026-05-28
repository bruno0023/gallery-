import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import type { Photo } from "../../photo/models/photo";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photo/components/photo-image-selectable";

//Img
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {

    const isLoading = false;
    const photos: Photo[] = [
        {
            id: '1',
            title: 'Photo Title',
            imageId: 'portrait-tower.png',
            albums: [
                { id: '1', title: 'Album 1' },
                { id: '2', title: 'Album 2' },
                { id: '3', title: 'Album 3' }
            ]
        },
        {
            id: '2',
            title: 'Photo Title',
            imageId: 'square-breakfast.png',
            albums: [
                { id: '1', title: 'Album 1' },
                { id: '2', title: 'Album 2' },
                { id: '3', title: 'Album 3' }
            ]
        },
        {
            id: '1',
            title: 'Photo Title',
            imageId: 'portrait-tower.png',
            albums: [
                { id: '1', title: 'Album 1' },
                { id: '2', title: 'Album 2' },
                { id: '3', title: 'Album 3' }
            ]
        },

    ];

    function handleTogglePhoto(selected: boolean, photoId: string) {
        console.log(selected, photoId)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Criar Album</DialogHeader>

                <DialogBody className='flex flex-col gap-5'>

                    <InputText placeholder="Adicione um título" />

                    <div className="space-y-3">
                        <Text as="div" variant="label-small">Fotos Cadastradas</Text>


                        {!isLoading && photos.length > 0 && <div className="flex flex-wrap gap-2">

                            {
                                photos.map(photo => (
                                    <PhotoImageSelectable
                                        key={photo.id}
                                        src={`/images/${photo.imageId}`}
                                        title={photo.title}
                                        imageClassName="w-20 h-20"
                                        onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
                                    />
                                ))
                            }

                        </div>
                        }

                        {isLoading && <div className="flex flex-wrap gap-2">

                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton
                                        key={`photo-loading-${index}`}
                                        className="w-20 h-20 rounded-lg"
                                    />
                                ))
                            }

                        </div>}

                        {!isLoading && photos.length === 0 && (
                            <div className="W-full flex flex-col items-center justify-center gap-3">
                                <SelectCheckboxIllustration />
                                <Text variant="paragraph-medium" className="text-center">
                                    Nenhuma foto cadastrada ainda.
                                </Text>
                            </div>
                        )}

                    </div>

                </DialogBody>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button>Criar</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}