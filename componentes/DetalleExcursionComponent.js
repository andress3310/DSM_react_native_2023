import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, TextInput, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Card, Icon } from '@rneui/themed';
import { baseUrlimages, tituloColorClaro } from '../comun/comun';
import { connect } from 'react-redux';
import { postComentario, postFavorito, postModalComentario, updateModalView } from '../redux/ActionCreators';
import * as Haptics from 'expo-haptics';

const modalStyles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
});

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: {'comentarios':Object.values(state.comentarios.comentarios),'errMess':state.comentarios.errMess},
    favoritos: state.favoritos,
    modalComentario: state.modalComentario
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  updateModalView: () => dispatch(updateModalView()),
  postModalComentario: (event) => dispatch(postModalComentario(event)),
  postComentario: (comentario) => dispatch(postComentario(comentario))
})

function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Divider />
        <Card.Image source={{ uri: baseUrlimages + excursion.imagen }}></Card.Image>
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name={'pencil'}
            type='font-awesome'
            color='#000FFF'
            onPress={() => props.updateModalView()}
          />
        </View>
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}
function RenderComentario(props) {
  comentarios = props.comentarios;
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
  constructor() {
    super()
    this.resetModal = this.resetModal.bind(this);
    this.gestionarComentario = this.gestionarComentario.bind(this);
  }

  actualizarUsuario(usuario) {
    this.props.postModalComentario({
      nombre: 'usuario',
      value: usuario
    }
    );
  };
  actualizarComentario(comentario) {
    this.props.postModalComentario({
      nombre: 'comentario',
      value: comentario
    }
    );
  };

  actualizarRating(rating) {
    this.props.postModalComentario({
      nombre: 'rating',
      value: rating
    }
    );
  };

  resetModal() {
    this.actualizarComentario('');
    this.actualizarRating(3);
    this.actualizarUsuario('');
    this.props.updateModalView();
  }

  gestionarComentario() {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
    const comentario = {
      excursionId: this.props.route.params.excursionId,
      valoracion: this.props.modalComentario.modalComentario.rating,
      autor: this.props.modalComentario.modalComentario.usuario,
      comentario: this.props.modalComentario.modalComentario.nuevoComentario,
      dia: new Date().toString()
    }
    this.props.postComentario(comentario)
    this.resetModal();
  }

  marcarFavorito(excursionId) {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    )
    this.props.postFavorito(excursionId);
  };

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          updateModalView={this.props.updateModalView}
        />

        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />
        <Modal visible={this.props.modalComentario.modalComentario.view} animationType="slide">
          <View style={modalStyles.container}>
            <Text>Valoración: {this.props.modalComentario.modalComentario.rating}/5</Text>
            <Rating
              startingValue={this.props.modalComentario.modalComentario.rating}
              onFinishRating={rating => this.actualizarRating(rating)}
            />
            <View style={modalStyles.inputContainer}>
              <Icon name="user" type="font-awesome" size={15} style={modalStyles.inputIcon} />
              <TextInput style={modalStyles.input} value={this.props.modalComentario.modalComentario.usuario} onChangeText={usuario => this.actualizarUsuario(usuario)} />
            </View>

            <View style={modalStyles.inputContainer}>
              <Icon name="comment" type="font-awesome" size={15} style={modalStyles.inputIcon} />
              <TextInput style={modalStyles.input} value={this.props.modalComentario.modalComentario.nuevoComentario} onChangeText={comentario => this.actualizarComentario(comentario)} />
            </View>

            <Button title="Cancelar" onPress={this.resetModal} />
            <Button title="Enviar comentario" onPress={this.gestionarComentario}/>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);