import React, {Component} from 'react';
import {Table} from 'reactstrap'
import api from '../../services/api';

export default class Places extends Component{
  
  constructor() {
    super();
    this.state = {
       data: []
    }
  }
  
  componentDidMount(){
    this.loadPlaces();
  }
  
  loadPlaces = async () => {
    var th = this;
    const response = await api.get('api/v1.0/places')
    th.setState({
      data: response.data.places 
    })
    console.log(response);
  }
  
  componentWillUnmount() {
   this.response.abort();
  }
  
  render(){
    return (
      <div>
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Cidade</th>
              <th>Nome</th>
              <th>Estado</th>
              <th>Criado em:</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.data.map((item) =>
              <tr>
                <td>{item.id}</td> 
                <td>{item.city}</td>
                <td>{item.name}</td> 
                <td>{item.state}</td>
                <td>{item.created_at}</td>  
              </tr>
            ) }
          </tbody>
        </Table>
      </div>
    );
  }
}
