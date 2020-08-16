
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class TabelaDadosSolicitacao extends Component {

  deletarItem = id_solicitacao => {
    let confirmDelete = window.confirm('Deseja deletar o registro?')
    if(confirmDelete){
      fetch('http://localhost:3000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_solicitacao
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id_solicitacao)
      })
      .catch(err => console.log(err))
    }
  }

  render() {

    const items = this.props.items.map(item => {

      return (
        <tr key={item.id_solicitacao}>
          <th scope="row">{item.id_solicitacao}</th>
          <td>{item.solicitante}</td>
          <td>{item.solicitacao}</td>
          <td>{item.data}</td>
          <td>{item.status === true ? 'Fechado' : 'Aberto'}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deletarItem(item.id_solicitacao)}>Delete</Button>
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
            <th>Solictante</th>
            <th>Solicitação</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {[items]}
        </tbody>
      </Table>
    )
  }
}

export default TabelaDadosSolicitacao