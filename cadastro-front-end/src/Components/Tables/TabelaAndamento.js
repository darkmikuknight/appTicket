
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import ModalFormAndamento from '../Modals/ModalAndamento'
import ReactDOM from 'react-dom'

class TabelaDadosAndamento extends Component {

  deletarItem = id_andamento=> {
    let confirmDelete = window.confirm('Deseja deletar o registro?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud2', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_andamento
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id_andamento)
      })
      .catch(err => console.log(err))
    }
  }

  render() {

   
    const items = this.props.items.map(item => {
        console.log('item'+ item.id_andamento)
      return (

        <tr key={item.id_andamento}>
          <th scope="row">{item.id_andamento}</th>
          <td>{item.descricao}</td>
          <td>{item.data_andamento}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalFormAndamento buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deletarItem(item.id_andamento)}>Delete</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Data Andamento</th>
          </tr>
        </thead>
        <tbody>
          {[items]}
        </tbody>
      </Table>
    )
  }
}

export default TabelaDadosAndamento