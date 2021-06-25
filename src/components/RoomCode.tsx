import copyImg from '../assets/img/copy.svg'
import '../assets/css/roomCode.scss'

type RoomCodeProps = {
  code : string;
}

export function RoomCode(props: RoomCodeProps){
  function copyRoomCodeToClipBoard(){
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="copy room code"/>
      </div>
      <span>Sala {props.code}</span>
    </button>
  )
}