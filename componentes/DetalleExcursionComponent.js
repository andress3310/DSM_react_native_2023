import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, TextInput, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Card, Icon } from '@rneui/themed';
import { baseUrlimages, tituloColorClaro, tituloColorOscuro, baseUrldata } from '../comun/comun';
import { connect } from 'react-redux';
import { excursionesFailed, postComentario, postFavorito, postModalComentario, updateModalView, addFoto, patchSalidaExcursion, updateSiguienteSalida } from '../redux/ActionCreators';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';
import es from "date-fns/locale/es"

async function playMarioCoin() {
  const { sound } = await Audio.Sound.createAsync( require('../assets/marioCoin.mp3'));
  await sound.playAsync();
}

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
    comentarios: { 'comentarios': Object.values(state.comentarios.comentarios), 'errMess': state.comentarios.errMess },
    favoritos: state.favoritos,
    modalComentario: state.modalComentario,
    fotos: state.fotos,
    siguienteSalida: state.siguienteSalida
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  updateModalView: () => dispatch(updateModalView()),
  postModalComentario: (event) => dispatch(postModalComentario(event)),
  postComentario: (comentario) => dispatch(postComentario(comentario)),
  addFoto: (foto) => dispatch(addFoto(foto)),
  patchSalidaExcursion: (excursionId, salidaDatetime) => dispatch(patchSalidaExcursion(excursionId, salidaDatetime)),
  updateSiguienteSalida: (siguienteSalida) => dispatch(updateSiguienteSalida(siguienteSalida))
})


function RenderExcursion(props) {

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      fetch(baseUrldata + 'fotos.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'uri': result.assets[0].uri, 'id': props.excursionId.excursionId })
      });
      props.addFoto(result.assets[0].uri, props.excursionId.excursionId)
    }
  };

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
            color: tituloColorOscuro,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          {excursion.nombre}
        </Text>
        <Text style={{ margin: 20, textAlign: 'justify'}}>
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
          <Icon
            raised
            reverse
            name={'camera'}
            type='font-awesome'
            color='#0CD263'
            onPress={() => pickImage()}
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

function RenderFotos(props) {
  const imagenes = props.fotos.fotos.filter(foto => foto.id === props.excursionId)

  return (
    <Card>
      <Card.Title>IMÁGENES DE LA EXCURSIÓN</Card.Title>
      <Card.Divider />
      <View>
        {imagenes.map((uri) => {
          return (
            <Card.Image source={uri}></Card.Image>
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
    playMarioCoin();
  }


  render() {
    const { excursionId } = this.props.route.params;
    const excursion = this.props.excursiones.excursiones[+excursionId];
    const formatoFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    if (excursion != null && 'siguienteSalida' in excursion) {
      siguienteSalidaProgramada = new Date(excursion.siguienteSalida);
    } else {
      siguienteSalidaProgramada = new Date("2015-03-25");
    };
    textoSalida = siguienteSalidaProgramada.toLocaleString("es-ES", formatoFecha)
    textoSalida = textoSalida.charAt(0).toUpperCase() + textoSalida.slice(1);

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursion}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          updateModalView={this.props.updateModalView}
          addFoto={this.props.addFoto}
          excursionId={this.props.route.params}
        />
        <Card>
          <Text style={{ fontWeight: 'bold', justifyContent: 'center', fontSize: 16, marginBottom: 10, marginTop: 20 }}>Siguiente salida programada</Text>
          <Text style={{ justifyContent: 'center', fontSize: 17, marginBottom: 10 }}>{textoSalida}</Text>
          <View style={{ flexDirection: 'col', marginVertical: 30 }}>
          <Card.Divider/>
          <Text style={{ fontWeight: 'bold', justifyContent: 'center', textAlign: 'center', fontSize: 14, marginBottom: 10 }}>Editar fecha</Text>
            <DateTimePicker
              value={this.props.siguienteSalida.siguienteSalida}
              mode={'datetime'}
              is24Hour={true}
              onChange={(event, selectedDatetime) => {
                this.props.updateSiguienteSalida(selectedDatetime)
              }}
              style={{ marginRight: 70 }}
              locale='es'
            />
            <Button title="Cambiar" onPress={() => {
              this.props.patchSalidaExcursion(excursionId, this.props.siguienteSalida.siguienteSalida);
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
            }} ></Button>
          </View>
        </Card>

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
            <Button title="Enviar comentario" onPress={this.gestionarComentario} />
          </View>
        </Modal>
        <RenderFotos fotos={this.props.fotos} excursionId={excursionId} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);