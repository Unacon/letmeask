import React from "react";
import logo from "../assets/img/logo.svg";
import { Illustration } from "../components/Illustration";
import { Button } from "../components/Button";
import { useAuthor } from "../hooks/useAuthor";
import "../assets/css/adminRoomList.scss";
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

type FirebaseRoomType = Record<
  string,
  {
    autherId: string;
    roomId: string;
    title: string;
  }
>;

type listRoomType = {
  autherId: string;
  roomId: string;
  title: string;
};

export function AdminRoomList() {
  const { user } = useAuthor();
  const history = useHistory();
  const [roomList, setRoomList] = React.useState<listRoomType[]>([]);
  const [roomSelected, setRoomSelected] = React.useState("");
  const [roomDeleted, setRoomDeleted] = React.useState("");

  React.useEffect(() => {
    const roomRef = database.ref("rooms/");

    roomRef.once("value", (room) => {
      const dataBaseRoom: FirebaseRoomType = room.val() ?? {};
      const parseRoomList = Object.entries(dataBaseRoom)
        .filter(([key, value]) => {
          return user?.id === value?.autherId;
        })
        .map(([key, value]) => {
          return {
            roomId: key,
            autherId: value.autherId,
            title: value.title,
          };
        });
      setRoomList(parseRoomList);
    });

    return () => {
      roomRef.off("value");
    };
  }, [user?.id, roomDeleted]);

  function handleGotoRoom() {
    if (user?.id && roomSelected.trim() !== "") {
      history.push(`/admin/rooms/${roomSelected}`);
    }
  }

  function handleDeleteRoom() {
    if (!!user?.id && roomSelected.trim() !== "") {
      database.ref(`rooms/${roomSelected}`).remove();
    }
    setRoomDeleted(roomSelected);
  }

  function handleSelectRoom(roomId: string) {
    setRoomSelected(roomId);
  }

  return (
    <div id="path-home">
      <Illustration />
      <main>
        <div id="conta">
          <img src={logo} alt="Logo letmeask" />
          <div className="user-info">
            <img src={user?.avatar} alt="Avatar perfil" />
            <h2>{user?.name}</h2>
          </div>
          <select onChange={(e) => handleSelectRoom(e.target.value)}>
            <option></option>
            {roomList.map((room) => {
              return (
                <option key={room.roomId} value={room.roomId}>
                  {room.title}
                </option>
              );
            })}
          </select>
          <div className="dateRoom">
            <Button
              id="goRoom"
              disabled={!roomSelected}
              onClick={handleGotoRoom}
            >
              Entar na sala
            </Button>
            <Button
              id="deleteRoom"
              disabled={!roomSelected}
              onClick={handleDeleteRoom}
            >
              Excluir sala
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
