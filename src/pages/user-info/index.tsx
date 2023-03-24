import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg'
import * as S from './styles'
import { Title } from '@/components/title'

type UserType = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  phone: string
  website: string
}

export function UserInfo () {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserType | null>(null)
  const [recommendedUsers, setRecommendedUsers] = useState<UserType[]>([])

  useEffect(() => {
    async function loadUser () {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const data = await response.json()

        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadUser()
  }, [id])

  useEffect(() => {
    async function loadRecommendedUsers () {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()

        const filteredData = data.filter((user: UserType) => (
          user.id !== Number(id)),
        )

        setRecommendedUsers(filteredData)
      } catch (error) {
        console.error(error)
      }
    }

    loadRecommendedUsers()
  }, [id])

  return (
    <div>
      {user && (
        <S.Container>
          <header>
            <h1>Olá, {user.name} 👋</h1>
          </header>

          <S.Section>
            <div>
              <h2>Informações</h2>

              <S.ListContainer>
                <li>Nome: <span>{user.name}</span></li>
                <li>Usuário: <span>{user.username}</span></li>
                <li>Email: <span>{user.email}</span></li>
                <li>Telefone: <span>{user.phone}</span></li>
                <li>Website: <span>{user.website}</span></li>
              </S.ListContainer>
            </div>

            <div>
              <h2>Endereço</h2>

              <S.ListContainer>
                <li>Rua: <span>{user.address.street}</span></li>
                <li>Complemento: <span>{user.address.suite}</span></li>
                <li>Cidade: <span>{user.address.city}</span></li>
                <li>CEP: <span>{user.address.zipcode}</span></li>
              </S.ListContainer>
            </div>
          </S.Section>
        </S.Container>
      )}

      <S.Footer>
        <Title>Recomendados</Title>

        <S.UserList>
          {recommendedUsers.map(user => (
            <S.Container
              key={user.id}
              as={Link}
              to={`/user/${user.id}`}
              className="user-info"
            >
                <UserIcon aria-label="user" title="user" />
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
                <span>{user?.website}</span>
            </S.Container>
          ))}
        </S.UserList>
      </S.Footer>
    </div>
  )
}
