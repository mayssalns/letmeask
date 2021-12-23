import '../styles/components/room_code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src="/assets/images/copy.svg" alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}