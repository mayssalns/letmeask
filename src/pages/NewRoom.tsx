import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/pages/auth.scss'

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              className=""
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <a href="#">clique aqui</a></p>
        </div>
      </main>
    </div>
  )
}