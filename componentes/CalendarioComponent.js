import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { baseUrlimages} from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones
    }
}

class Calendario extends Component {

    render(){

    const { navigate } = this.props.navigation;
    isLoading = this.props.excursiones.isLoading;
    errMess = this.props.excursiones.errMess;

    const renderCalendarioItem = ({item, index}) => {
        return (
            <ListItem
            key={index}
            onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
            bottomDivider>
                <Avatar source={{uri: baseUrlimages + item.imagen}}/>
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        );
    };

        if (isLoading) {
            return (
                <IndicadorActividad />
            );
        }
        else if (errMess) {
            return (
                <View>
                    <Text>{props.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <SafeAreaView>
                    <FlatList 
                        data={this.props.excursiones.excursiones}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}

export default connect(mapStateToProps)(Calendario);