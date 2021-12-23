import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/pages/auth.scss'
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  console.log("USE AUTH", useAuth())

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className="">
      <aside>
        <img src="/assets/images/illustration.svg" alt="Ilustração simbolizando perguntas e respostas" className="" />
        <strong className="">Crie salas de Q&amp;A ao-vivo</strong>
        <p className="">Tire as dúvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src="/assets/images/logo.svg" alt="Letmeask" className="" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src="/assets/images/google-icon.svg" alt="Logo do Google" className="" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              className=""
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}