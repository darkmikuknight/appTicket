
import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'


class AddEditForm extends React.Component {
  state = {
    id_solicitacao: 0,
    solicitante: '',
    solicitacao: '',
    data: '',
    status: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        solicitante: this.state.solicitante,
        solicitacao: this.state.solicitacao,
        data: this.state.data,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_solicitacao: this.state.id_solicitacao,
        solicitante: this.state.solicitante,
        solicitacao: this.state.solicitacao,
        data: this.state.data,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    //Se existir algum item, então irá setar os dados no estado
    console.log('llllll')
    if(this.props.item){
      console.log('llllll')
      const { id_solicitacao, solicitante, solicitacao, data, status } = this.props.item
      this.setState({ id_solicitacao, solicitante, solicitacao, data, status })
    }
  }

   

  render() {

    console.log('sol=' + this.state.solicitacao)
    const status = [
      { value: true, label: 'Fechado' },
      { value: false, label: 'Aberto' }
    ];

    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="solicitante">Solicitante</Label>
          <Input type="text" name="solicitante" id="solicitante" onChange={this.onChange} value={this.state.solicitante === null ? '' : this.state.solicitante} />
        </FormGroup>
        <FormGroup>
          <Label for="solicitacao">Solicitação</Label>
          <Input type="text" name="solicitacao" id="solicitacao" onChange={this.onChange} value={this.state.solicitacao === null ? '' : this.state.solicitacao}  />
        </FormGroup>
        <FormGroup>
          <Label for="data">Data</Label>
          <Input type="datetime-local" name="data" id="data" onChange={this.onChange} value={this.state.data === null ? '' : this.state.data} />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input type="radio" name="status" id="status" maxLength="1" placeholder="A (aberto) ou F (fechado)" onChange={this.onChange} checked={''}value={this.state.status === null ? 'F' : this.state.status} />
          <Select options = {status} />
        </FormGroup>
        <Button>Cadastrar</Button>
      </Form>
    );
  }
}

export default AddEditForm