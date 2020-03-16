import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import api from '../../services/api';

export default class NewPlaces extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      id: "", // pegar de forma correta
      name: "",
      slug: "",
      city:"",
      state: "",
      created_at: "",
      updated_at: "",
      message : "" ,
    };
  }

  sendPlace = async e => {
    e.preventDefault();
    const { name, slug, city, state } = this.state;
    //var lastId = 0;
    if (!name || !city || !state) {
      this.setState({ message: "Preencha os campos obrigatorios!" });
    } else {
      try {
        /* caso precise recuperar o ultimo ID
        const response = await api.get('api/v1.0/places');
        for(let i=1; i<response.data.places.length; i++){
          if(response.data.places.id[i] > response.data.places[i-1]){
            lastId = response.data.places.id[i];
          }
        }*/
        //var date = new Date(); caso precise pegar a data manualmente
        const data = {name: name, slug: city.toLowerCase(), city: city, state: state};
        console.log(JSON.stringify(data));
        const response = await api.post('api/v1.0/places/new', JSON.stringify(data))
        this.props.history.push("/places");
      } catch (err) {
        this.setState({
          message:
            "Houve um problema para inserir os dados."
        });
      }
    }
  };
  render(){
    return (
      <div id="main-place" className="col-md-6">
      <div className="my-3">
        {
          this.state.message !== '' ? (
          <Alert color="danger" className="text-center"> {this.state.message}</Alert>
          ) : ''
        }
      </div>
      <Form>
        <FormGroup>
          <Label for="name">Nome:</Label>
          <Input type="text" id="name" onChange={e => this.setState({name: e.target.value}) } placeholder="Informe o nome da cidade"/>
        </FormGroup>
        <FormGroup>
          <Label for="city">Cidade:</Label>
          <Input type="text" id="city" onChange={e => this.setState({city: e.target.value}) } placeholder="Informe a cidade"/>
        </FormGroup>
        <FormGroup>
          <Label for="state">Estado:</Label>
          <Input type="text" id="state" onChange={e => this.setState({state: e.target.value}) } placeholder="Informe o estado"/>
        </FormGroup>
        <Button color="primary" block onClick={this.sendPlace}> Enviar </Button>
      </Form>
    </div>
    );
  }
}
