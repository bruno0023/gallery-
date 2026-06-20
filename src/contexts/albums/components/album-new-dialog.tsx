import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";

//Componentes
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photo/components/photo-image-selectable";

//hooks
import usePhotos from "../../photo/hooks/use-photos";
import useAlbum from "../hooks/use-album";

//Schemas
import { albumNewFormSchema, type AlbumNewFormSchema } from "../schemas";

//Img
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {

    const [modalOpen, setModalOpen] = React.useState(false);

    const form = useForm<AlbumNewFormSchema>({
        resolver: zodResolver(albumNewFormSchema)
    })

    const { photos, isLoadingPhotos } = usePhotos()
    const { createAlbum } = useAlbum()
    const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition();

    React.useEffect(() => {
        if (!modalOpen) {
            form.reset()
        }
    }, [modalOpen, form])

    function handleTogglePhoto(photoId: string) {
        const photosIds = form.getValues('photosIds') || [];
        const photosSet = new Set(photosIds);

        if (photosSet.has(photoId)) {
            photosSet.delete(photoId);
        } else {
            photosSet.add(photoId);
        }

        form.setValue('photosIds', Array.from(photosSet));
    }

    function handleSubmit(payload: AlbumNewFormSchema) {
        setIsCreatingAlbum(async () => {
            await createAlbum(payload);
            setModalOpen(false);
        });
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>Criar Album</DialogHeader>

                    <DialogBody className='flex flex-col gap-5'>

                        <InputText
                            placeholder="Adicione um título"
                            error={form.formState.errors.title?.message}
                            {...form.register('title')}
                        />

                        <div className="space-y-3">
                            <Text as="div" variant="label-small">Fotos Cadastradas</Text>


                            {!isLoadingPhotos && photos.length > 0 && <div className="flex flex-wrap gap-2">

                                {
                                    photos.map(photo => (
                                        <PhotoImageSelectable
                                            key={photo.id}
                                            src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                                            title={photo.title}
                                            imageClassName="w-20 h-20"
                                            onSelectImage={() => handleTogglePhoto(photo.id)}
                                        />
                                    ))
                                }

                            </div>
                            }

                            {isLoadingPhotos && <div className="flex flex-wrap gap-2">

                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <Skeleton
                                            key={`photo-loading-${index}`}
                                            className="w-20 h-20 rounded-lg"
                                        />
                                    ))
                                }

                            </div>}

                            {!isLoadingPhotos && photos.length === 0 && (
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
                            <Button variant="secondary" disabled={isCreatingAlbum}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            type='submit'
                            disabled={isCreatingAlbum}
                            handling={isCreatingAlbum}
                        >
                            {isCreatingAlbum ? 'Criando...' : 'Criar'}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}