import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import ImagieFilePreview from "../../../components/image-preview";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import type { Album } from "../../albums/models/album";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";


interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {

    const form = useForm()

    const isLoading = false
    const albums: Album[] = [
        { id: '1', title: 'Album 1' },
        { id: '2', title: 'Album 2' },
        { id: '3', title: 'Album 3' }
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>Adicionar Foto</DialogHeader>

                <DialogBody className='flex flex-col gap-5'>
                    <InputText placeholder="Adicione um título" />

                    <Alert className="mb-4">
                        Tamanho máximo: 50MB
                        <br />
                        Você pode selecionar arquivos em PNG, JPG, JPEG
                    </Alert>

                    <InputSingleFile
                        form={form}
                        maxFileSizeInMB={50}
                        allowedExtensions={['png', 'jpg', 'jpeg']}
                        replaceBy={<ImagieFilePreview alt="imagem" className="w-full h-56" />}
                    />

                    <div className="space-y-3">
                        <Text variant="heading-small">Selecionar Albums</Text>

                        <div className="flex flex-wrap gap-3 mt-2">
                            {!isLoading && albums.length > 0 && albums.map(album => (
                                <Button key={album.id} variant="ghost" size="sm" className="truncate">{album.title}</Button>
                            ))}

                            {isLoading && Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={`album-loading-${index}`} className="w-20 h-7" />
                            ))}
                        </div>

                    </div>

                </DialogBody>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='secondary'>Cancelar</Button>
                    </DialogClose>

                    <Button variant='primary'>Adicionar</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}