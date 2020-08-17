
import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import Moment from 'moment-timezone'
import AppAndamento from '../../AppAndamento'

const opcoes = [
  { value: true, label: 'Fechado' },
  { value: false, label: 'Aberto' }
]

class AddEditForm extends React.Component {
  state = {
    id_solicitacao: 0,
    solicitante: '',
    solicitacao: '',
    data: '',
    status: []
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {

    try{

      if(this.state.status.value === undefined)
        throw new Error()
      
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
          status: this.state.status.value
        })
      })
        .then(response => response.json())
        .then(item => {
          if(Array.isArray(item)) {
            this.props.addItemToState(item[0])
            this.props.toggle()
          } 
          else {
            alert('Selecione um status!')
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
  }
    catch(r){
      alert('Necessário escolher o status')
      return false
    }
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
        status: this.state.status.value
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.updateState(item[0])
          this.props.toggle()
        } 
        else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    //Se existir algum item, então irá setar os dados no estado
    if(this.props.item){
      const { id_solicitacao, solicitante, solicitacao, data, status } = this.props.item
      this.setState({ id_solicitacao, solicitante, solicitacao, data, status })
    }
  }

  handleChange = (status) => {
    this.setState({ status })
  }

  teste = (id) => {
    //AppAndamento.getItemsAndamento(id);
  }

  render() {

    const { status } = this.state
    const { data } = this.state
    const { id_solicitacao } = this.state

    let labelStatus = []
    //const novoStatus = { value: false, label: 'Aberto' }
  
    if(this.props.item){
      if(typeof(status) === "boolean")
        labelStatus = this.state.status === false ? { value: false, label: 'Aberto' } : { value: true, label: 'Fechado' }
      
      if(typeof(status) === "object")
        labelStatus = this.state.status.value === false ? { value: false, label: 'Aberto' } : { value: true, label: 'Fechado' }
    }
  
    const timezone = 'America/Sao_Paulo'
    const format = 'yyyy-MM-DDThh:mm'
    //console.log( 'aa='+ Moment(data).tz(timezone).format(format))
    //console.log( Moment(data).tz(timezone).format(format))

    console.log('props=' + this.state.id_solicitacao)

    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="solicitante">Solicitante</Label>
          <Input type="text" name="solicitante" id="solicitante" onChange={this.onChange} required value={this.state.solicitante === null ? '' : this.state.solicitante} />
        </FormGroup>
        <FormGroup>
          <Label for="solicitacao">Solicitação</Label>
          <Input type="text" name="solicitacao" id="solicitacao" onChange={this.onChange} required value={this.state.solicitacao === null ? '' : this.state.solicitacao}  />
        </FormGroup>
        <FormGroup>
          <Label for="data">Data</Label>
          <Input type="datetime-local" name="data" id="data" onChange={this.onChange} required value={this.state.data === null ? null : Moment(data).tz(timezone).format(format)} />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Select placeholder="Selecione..." name="status" id="status" value={this.props.item ? labelStatus : status} onChange={this.handleChange} options={opcoes} /> 
        </FormGroup>
        <Button type="submit">Cadastrar</Button>
        <FormGroup>
          <AppAndamento type="button" className="btn btn-info" name="andamento" id="andamento" style={{marginLeft: "10px"}} onChange={this.teste(this.state.id_solicitacao)} >
        
          </AppAndamento>        
        </FormGroup>
      </Form>
    );
  }
}
// <button type="button" className="btn btn-info" name="andamento" id="andamento" style={{marginLeft: "10px"}} onClick={ <AppAndamento type="button" className="btn btn-info" name="andamento" id="andamento" style={{marginLeft: "10px"}}/> } >Andamentos</button>

export default AddEditForm