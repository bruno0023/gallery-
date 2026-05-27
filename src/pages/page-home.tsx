import Container from "../components/container";
import PhotoWidget from "../contexts/photo/components/photo-widget";
import type { Photo } from "../contexts/photo/models/photo";

export default function PageHome() {
    return (
        <Container>
            <div className='grid grid-cols-4 gap-9'>
                <PhotoWidget photo={
                    {
                        id: '123',
                        title: 'Photo Title',
                        imageId: 'portrait-tower.png',
                        albums: [
                            { id: '1', title: 'Album 1' },
                            { id: '2', title: 'Album 2' },
                            { id: '3', title: 'Album 3' }
                        ]
                    }}
                />

                <PhotoWidget photo={{} as Photo} loading={true} />
            </div>
        </Container>
    )
}