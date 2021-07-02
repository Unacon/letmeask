import React from "react";
import { Button } from "./Button";
import { RoomCode } from "./RoomCode";
import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/img/logo.svg";
import { database } from "../services/firebase";
import { useAuthor } from "../hooks/useAuthor";

type RoomParams = {
  id: string;
};

type HeaderRoomType = {
  usuario: string;
};

export function HeaderRoom(props: HeaderRoomType) {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  const { user } = useAuthor();

  async function handleDeleteRoom() {
    if (window.confirm("Tem certeza que você deseja excluir essa sala?")) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
    }

    history.push("/");
  }

  function handleExitRoom() {
    history.push("/");
  }

  function handleGotoRoom() {
    if (user?.id) {
      history.push("/");
    }
  }

  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask" onClick={handleGotoRoom} />
        <div>
          <RoomCode code={params.id} />
          {props.usuario === "Admin" && (
            <Button isOutlined onClick={handleDeleteRoom}>
              Encerrar sala
            </Button>
          )}
          <Button isOutlined onClick={handleExitRoom}>
            Sair da sala
          </Button>
        </div>
      </div>
    </header>
  );
}
