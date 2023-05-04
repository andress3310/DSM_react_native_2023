import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { baseUrl, tituloColorClaro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})

function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
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
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <Icon
          raised
          reverse
          name={props.favorita ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
        />
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
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
              <Card.Divider />
            </View>
          );
        })}
      </View>
    </Card>
  );
}

class DetalleExcursion extends Component {

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetalleExcursion);