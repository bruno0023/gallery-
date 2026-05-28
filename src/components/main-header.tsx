import React from "react";
import cx from "classnames";
import { Link } from "react-router";

import Container from "./container";
import Button from "./button";
import PhotoSearch from "./photo-search";
import Divider from "./divider";
import PhotoNewDialog from "../contexts/photo/components/photo-new-dialog";
import AlbumNewDialog from "../contexts/albums/components/album-new-dialog";

// Ícone
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";

interface MainHeaderProps extends React.ComponentProps<typeof Container> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {

  return (
    <Container
      as="header"
      className={cx("flex justify-between items-center gap-10", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>

      <PhotoSearch />

      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova Foto</Button>} />
        <AlbumNewDialog
          trigger={<Button variant="secondary">Criar Album</Button>}
        />
      </div>
    </Container>
  );
}