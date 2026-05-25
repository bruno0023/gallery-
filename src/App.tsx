import Button from "./components/button";
import Text from "./components/text";
import ButtonIcon from "./components/button-icon";
import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/badge";
import Alert from "./components/alert";
import Divider from "./components/divider";
import InputCheckbox from "./components/input-checkbox";
import InputSingleFile from "./components/input-single-file";
import { useForm } from "react-hook-form";
import ImagieFilePreview from "./components/image-file-preview";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

export default function App() {

	const form = useForm()
	const file = form.watch('file')
	const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>

			<div>
				<InputCheckbox />
			</div>

			<div>
				<InputSingleFile 
				maxFileSizeInMB={50} 
				allowedExtensions={['png', 'jpg', 'jpeg', 'webp']} 
				replaceBy={<ImagieFilePreview src={fileSrc} alt="imagem" />}
				form={form} 
				{...form.register('file')}/>
			</div>

			<div>
				
				<Dialog>
					<DialogTrigger asChild>
						<Button>Abrir Modal</Button>
					</DialogTrigger>
					<DialogContent>
						<Text>Testando modal</Text>
					</DialogContent>
				</Dialog>

			</div>
		</div>
	);
}
