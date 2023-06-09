import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrlimages, tituloColorOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        actividades: state.actividades,
        excursiones: state.excursiones,
        cabeceras: state.cabeceras
    }
}

function RenderItem(props) {
    const item = props.item;

    if (props.isLoading) {
        return (
            <IndicadorActividad/>
        );
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {
        const item = props.item;

        if (item != null) {
            return (
                <Card>
                    <Card.Divider />
                    <Card.Image source={{ uri: baseUrlimages + item.imagen }}></Card.Image>
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
                        {item.nombre}
                    </Text>
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }
}

class Home extends Component {

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);