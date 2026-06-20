import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import ImagieFilePreview from "../../../components/image-preview";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import usePhoto from "../hooks/use-photo";



interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {

    const [modalOpen, setModalOpen] = React.useState(false);

    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema)
    })

    const { albums, isLoadingAlbums } = useAlbums()
    const { createPhoto } = usePhoto()
    const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition();

    const file = form.watch('file')
    const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    const albumsIds = form.watch('albumsIds');

    React.useEffect(() => {
        if (!modalOpen) {
            form.reset()
        }
    }, [modalOpen, form])


    function handleToggleAlbum(AlbumId: string) {
        const albumsIds = form.getValues('albumsIds') || [];
        const albumsSet = new Set(albumsIds);

        if (albumsSet.has(AlbumId)) {
            albumsSet.delete(AlbumId);
        } else {
            albumsSet.add(AlbumId);
        }

        form.setValue('albumsIds', Array.from(albumsSet));
    }

    function handleSubmit(payload: PhotoNewFormSchema) {
        setIsCreatingPhoto(async () => {
            await createPhoto(payload);
            setModalOpen(false);
        })
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>Adicionar Foto</DialogHeader>

                    <DialogBody className='flex flex-col gap-5'>
                        <InputText
                            placeholder="Adicione um título"
                            maxLength={255}
                            error={form.formState.errors.title?.message}
                            {...form.register('title')}
                        />

                        <Alert className="mb-4">
                            Tamanho máximo: 50MB
                            <br />
                            Você pode selecionar arquivos em PNG, JPG, JPEG
                        </Alert>

                        <InputSingleFile
                            form={form}
                            maxFileSizeInMB={50}
                            allowedExtensions={['png', 'jpg', 'jpeg']}
                            replaceBy={<ImagieFilePreview src={fileSrc} alt="imagem" className="w-full h-56" />}
                            error={form.formState.errors.file?.message}
                            {...form.register('file')}
                        />

                        <div className="space-y-3">
                            <Text variant="heading-small">Selecionar Albums</Text>

                            <div className="flex flex-wrap gap-3 mt-2">
                                {!isLoadingAlbums && albums.length > 0 && albums.map(album => (
                                    <Button
                                        key={album.id}
                                        variant={albumsIds?.includes(album.id) ? 'primary' : 'ghost'}
                                        size="sm"
                                        className="truncate"
                                        onClick={() => handleToggleAlbum(album.id)}
                                    >
                                        {album.title}
                                    </Button>
                                ))}

                                {isLoadingAlbums && Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={`album-loading-${index}`} className="w-20 h-7" />
                                ))}
                            </div>

                        </div>

                    </DialogBody>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='secondary' disabled={isCreatingPhoto}>Cancelar</Button>
                        </DialogClose>

                        <Button
                            disabled={isCreatingPhoto}
                            handling={isCreatingPhoto}
                            type="submit"
                            variant='primary'
                        >
                            {isCreatingPhoto ? 'Adicionando...' : 'Adicionar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}