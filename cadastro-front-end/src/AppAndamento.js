
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalFormAndamento from './Components/Modals/ModalAndamento'
import TabelaDadosAndamento from './Components/Tables/TabelaAndamento'
//import ModalFormAndamento from './Components/Modals/ModalAndamento'

class AppAndamento extends Component {
  state = {
    items: []
  }

  getItemsAndamento = (id) => {
    console.log('IDdd=' + id)

    fetch('http://localhost:3000/crud2', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_solicitacao: id
      })
    })
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log('get='+err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id_andamento === item.id_andamento)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id_andamento !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(id){
    this.getItemsAndamento(id)

  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h4 style={{margin: "20px 0"}}>Andamentos</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <TabelaDadosAndamento items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalFormAndamento buttonLabel="Add Item" id="add-item-andamento" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AppAndamento