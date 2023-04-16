import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl, tituloColorClaro } from '../comun/comun';

function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Divider/>
              <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
              <Text
                    style={{
                        position: 'absolute',
                        top: 25,
                        left: 0,
                        right: 0,
                        color: tituloColorClaro,
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                    {excursion.nombre}
                    </Text>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <Icon
                raised
                reverse
                name={ props.favorita ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentario(props) {
    const comentarios = props.comentarios;
   
    return (
    <Card>
    <Card.Title>Comentarios</Card.Title>
    <Card.Divider/>
    <View>
      {comentarios.map((comentario) => {
        return (
          <View>
            <Text>{comentario.comentario}</Text>
            <Text 
                style={{

                    color: 'coral',
                    textAlign: 'left',
                    fontSize: 15,
                    fontWeight: 'bold',
                }}>
                {comentario.valoracion}/5
            </Text>
            <Text>-- {comentario.autor}, {comentario.dia}</Text>
            <Text></Text>
            <Card.Divider/>
          </View>
        );
      })}
    </View>
    </Card>
    );
}

class DetalleExcursion extends Component {
        constructor(props) {
            super(props);
            this.state = {
                excursiones: EXCURSIONES,
                comentarios: COMENTARIOS, 
                favoritos: []
            };
        }
        marcarFavorito(excursionId) {
            this.setState({favoritos: this.state.favoritos.concat(excursionId)});
        }
        render(){
            const {excursionId} = this.props.route.params;
            return(
                <ScrollView>
                <RenderExcursion
                excursion={this.state.excursiones[+excursionId]}
                favorita={this.state.favoritos.some(el => el === excursionId)}
                onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
                </ScrollView>
                );        
            }
}

export default DetalleExcursion;