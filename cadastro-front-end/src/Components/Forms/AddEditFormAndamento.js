
import React from 'react'
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../Modals/Modal'
import Select from 'react-select'
import Moment from 'moment-timezone'
import TabelaDadosAndamento from '../Tables/TabelaAndamento'
import ModalFormAndamento from '../Modals/ModalAndamento'
import AppAndamento from '../../AppAndamento'

class AddEditFormAndamento extends React.Component{
  state = {
    id_andamento: 0,
    descricao: '',
    data_andamento: '',
    id_solicitacao: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    try{

      e.preventDefault()
      fetch('http://localhost:3000/crud2', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descricao: this.state.descricao,
          data_andamento: this.state.data_andamento,
          id_solicitacao: this.state.id_solicitacao
        })
      })
        .then(response => response.json())
        .then(item => {
          if(Array.isArray(item)) {
            this.props.addItemToState(item[0])
            this.props.toggle()
          } 
          else {
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
  }
    catch(r){
      alert('Ocorreu algum erro durante o cadastro do andamento. Faça novamente por favor!')
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
        id_andamento: this.state.id_andamento,
        descricao: this.state.descricao,
        data_andamento: this.state.data_andamento,
        id_solicitacao: this.state.id_solicitacao
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
      const { id_andamento, descricao, data_andamento, id_solicitacao } = this.props.item
      this.setState({ id_andamento, descricao, data_andamento, id_solicitacao })
    }
  }

  handleChange = (status) => {
    this.setState({ status })
  }

  teste = () => alert('aaaa')

  render() {

    const { data_andamento } = this.state
    const timezone = 'America/Sao_Paulo'
    const format = 'yyyy-MM-DDThh:mm'
    //  console.log( 'aa='+ Moment(data).tz(timezone).format(format))
    // console.log( Moment(data).tz(timezone).format(format))

    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="descricao">Descrição do andamento</Label>
          <Input type="text" name="descricao" id="descricao" onChange={this.onChange} required value={this.state.descricao === null ? '' : this.state.descricao} />
        </FormGroup>
        <FormGroup>
          <Label for="data">Data</Label>
          <Input type="datetime-local" name="data" id="data" onChange={this.onChange} required value={this.state.data_andamento === null ? null : Moment(data_andamento).tz(timezone).format(format)} />
        </FormGroup>
        <Button type="submit">Cadastrar</Button>
      </Form>
    )
  }
}

export default AddEditFormAndamento