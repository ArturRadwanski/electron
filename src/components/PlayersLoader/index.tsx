import { Container, Table, TableItem, DeleteButton } from './styles'
import { Button } from '../Button'
import React from 'react'
import Swal from 'sweetalert2'

export function PlayersLoader(props: {
  players: Array<string>
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>
}) {
  function loadPlayers() {
    const fileContainer = document.createElement('input')
    fileContainer.setAttribute('type', 'file')
    fileContainer.setAttribute('accept', '.csv')
    fileContainer.click()
    fileContainer.onchange = () => {
      let file: File = fileContainer.files![0]
      if (!file.name.endsWith('csv')) {
        alert('this is not csv file')
        return
      }
      const reader = new FileReader()
      reader.onload = e => {
        // @ts-ignore
        const text: string = e.target!.result
        const data = text.split(',')
        props.setPlayers(data)
      }
      reader.readAsText(file)
    }
  }

  function deletePlayer(e: React.MouseEvent) {
    let name = e.currentTarget.getAttribute('name')
    e.stopPropagation()
    props.setPlayers(
      props.players.filter((el: string) => {
        return el != name
      })
    )
  }

  function addPlayer() {
    Swal.fire({
      title: 'Submit new player',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (name: string | null) => {
        if (name == null) {
          alert('Name cannot be empty!')
          return
        }
        if (name.includes(',')) {
          Swal.fire({
            title: "Name cannot include ','",
          })
          return
        }
        if (props.players.includes(name)) return
        props.setPlayers([...props.players, name!])
      },
    })
  }

  function editPlayer(player: string) {
    Swal.fire({
      title: 'Edit existing player',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      inputValue: player,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (name: string | null) => {
        if (name == null) {
          alert('Name cannot be empty!')
          return
        }
        if (name.includes(',')) {
          Swal.fire({
            title: "Name cannot include ','",
          })
          return
        }
        if (props.players.includes(name)) return
        props.setPlayers(() => {
          return [
            ...props.players.filter(el => {
              return el != player
            }),
            name,
          ]
        })
      },
    })
  }

  return (
    <Container>
      <Table>
        {props.players.map((name: string, i: number) => {
          return (
            <TableItem
              key={i}
              onClick={() => {
                editPlayer(name)
              }}
            >
              <p>{name}</p>
              <DeleteButton onClick={deletePlayer} name={name}>
                ×
              </DeleteButton>
            </TableItem>
          )
        })}
        {props.players.length < 16 ? (
          <TableItem opacity="true" onClick={addPlayer}>
            +
          </TableItem>
        ) : null}
      </Table>
      <Button onClick={loadPlayers}>Load player from file</Button>
    </Container>
  )
}
