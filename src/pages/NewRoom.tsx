import React from "react";
import logo from "../assets/img/logo.svg";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/NewRoom.scss";

import { database } from "../services/firebase";
import { useAuthor } from "../hooks/useAuthor";
import { Illustration } from "../components/Illustration";
import toast, { Toaster } from "react-hot-toast";

export function NewRoom() {
  const { user } = useAuthor();
  const [nameRoom, setNameRoom] = React.useState("");
  const history = useHistory();

  async function handleCreateRoom(event: React.FormEvent) {
    event.preventDefault(); //Evitar recarregamento de pagina

    if (nameRoom.trim() === "") {
      toast.error("Escreva o nome da sala.", {
        style: {
          color: "#FFFF",
          background: "#a13434",
        },
      });
      return; // poderia adicionar um modal
    }

    const newRoom = database.ref("rooms");

    const firebase = await newRoom.push({
      title: nameRoom,
      autherId: user?.id,
    });

    history.push(`/admin/rooms/${firebase.key}`);
  }

  return (
    <div id="path">
      <Toaster />
      <Illustration />
      <main>
        <div id="conta">
          <img src={logo} alt="Logo letmeask" />
          <div className="user-info">
            <img src={user?.avatar} alt="Avatar perfil" />
            <h2>{user?.name}</h2>
          </div>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNameRoom(event.target.value)}
              value={nameRoom}
            />
            <Button type="submit">Criar sala</Button>
            <p>
              Quer entrar em uma sala já existente?
              <Link to="/">Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
