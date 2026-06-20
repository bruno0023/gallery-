import type { Album } from "../models/album";
import Text from "../../../components/text";
import Button from "../../../components/button";
import cx from "classnames";
import Skeleton from "../../../components/skeleton";
import usePhotos from "../../photo/hooks/use-photos";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
    albums: Album[];
    loading?: boolean;
}

export default function AlbumsFilter({
    albums,
    loading,
    className,
    ...props
}: AlbumsFilterProps) {

    const { filters } = usePhotos()

    return (
        <div
            className={cx(
                "flex items-center gap-3.5 overflow-x-auto",
                className
            )}
            {...props}
        >
            <Text variant="heading-small">Albuns</Text>

            <div className="flex items-center gap-3 overflow-x-auto">
                {!loading && (
                    <>
                        <Button
                            size="sm"
                            className="cursor-pointer"
                            variant={filters.albumId === null ? "primary" : "ghost"}
                            onClick={() => filters.setAlbumId(null)}
                        >
                            Todos
                        </Button>

                        {albums.map((album) => (
                            <Button
                                key={album.id}
                                size="sm"
                                className="cursor-pointer"
                                variant={filters.albumId === album.id ? "primary" : "ghost"}
                                onClick={() => filters.setAlbumId(album.id)}
                            >
                                {album.title}
                            </Button>
                        ))}

                    </>
                )}

                {loading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={`album-filter-loading-${index}`}
                            className="w-20 h-8 rounded-md"
                        />
                    ))}
            </div>
        </div>
    );
}