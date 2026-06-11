import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import ImagieFilePreview from "../../../components/image-preview";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import useAlbums from "../../albums/hooks/use-albums";


interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {

    const form = useForm()
    const { albums, isLoadingAlbums} = useAlbums()

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
                            {!isLoadingAlbums && albums.length > 0 && albums.map(album => (
                                <Button key={album.id} variant="ghost" size="sm" className="truncate">{album.title}</Button>
                            ))}

                            {isLoadingAlbums && Array.from({ length: 3 }).map((_, index) => (
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