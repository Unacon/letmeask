import React from "react";
import logo from "../assets/img/logo.svg";
import googleIcon from "../assets/img/google-icon.svg";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";

import "../assets/css/home.scss";
import { useAuthor } from "../hooks/useAuthor";
import { Illustration } from "../components/Illustration";
import toast, { Toaster } from "react-hot-toast";

export function Home() {
  const { user, signInWithPopup } = useAuthor();
  const history = useHistory();
  const [codeRoom, setCodeRoom] = React.useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithPopup();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault();

    if (codeRoom === "") {
      toast.error("Digite o código da sala.", {
        style: {
          color: "#FFFF",
          background: "#a13434",
        },
        duration: 1000,
      });
      return; // modal
    }

    const roomRef = await database.ref(`rooms/${codeRoom}`).get();

    if (!roomRef.exists()) {
      toast.error("Essa sala não existe.", {
        style: {
          color: "#FFFF",
          background: "#a13434",
        },
        duration: 1000,
      });
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Essa sala já foi encerrada.", {
        style: {
          color: "#FFFF",
          background: "#a13434",
        },
        duration: 1000,
      });
      return;
    }

    history.push(`rooms/${codeRoom}`);
  }

  async function handleListRoom() {
    if (!user) {
      await signInWithPopup();
    }
    history.push("/admin/list");
  }

  return (
    <div id="path-home">
      <Toaster />
      <Illustration />
      <main>
        <div id="conta">
          <img src={logo} alt="Logo letmeask" />
          <button id="buttonGoogle" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Logo da google" />
            <span>Crie sua sala com a Google</span>
          </button>
          <button id="buttonListRoom" onClick={handleListRoom}>
            <span>Listar suas salas criadas</span>
          </button>
          <div id="line">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setCodeRoom(event.target.value)}
              value={codeRoom}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
