import { z } from 'zod';

export const photoNewFormSchema = z.object({
    title: z.string().min(1, { message: "O título é obrigatório" }).max(255),
    file: z.instanceof(FileList).refine(file => file.length > 0, { message: "O arquivo é obrigatório" }),
    albumsIds: z.array(z.string().uuid()).optional()
})

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>
