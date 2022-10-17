import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import Test from './Test.json'
import Icon from 'react-native-vector-icons/EvilIcons';


const {width, height} = Dimensions.get('screen');

class App extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      foodName: '',
      foodList: Test,

    }
  }

  searchItem = (val) => {
  var data = [];
  data = Test.filter(item => (item.Ingredient.includes(val)));
  console.log(data);
  this.setState({foodList: data});
  }

  renderItem = ({item}) => {
    return(
      <View style={styles.itemView}>
        <Image 
        source={{uri: item.imageUrl}}
        style={styles.imageView}/>
        <Text style={styles.headerTxt}>{item.Ingredient}</Text>
        <Text style={styles.shortTxt}>{item['Short text']}</Text>

      </View>
    )
     
  }

  render(){
    const {foodName, foodList} = this.state;
    return(
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor= {'#fff'}/>
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>Search</Text>

      </View>
      <View style={styles.inputWrap}>
      <Icon name="search" size={24} color="#7e8a9a" />
              <TextInput 
              style={styles.input}
              placeholder={'Food name'}
              placeholderTextColor={'#7e8a9a'}
              onChangeText={(text)=> {
                this.setState({foodName: text})
                this.searchItem(text)
              }}
              value={foodName}/>
            </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{}}>
        <View
          style={{
            backgroundColor: '#fff',
          }}>
            
            <View style={styles.bodyView}>
              <Text style={[styles.headerTxt, {marginLeft: 5, marginVertical: 5}]}>Foods</Text>
              <FlatList 
              data={foodList}
              renderItem={this.renderItem}
              numColumns={2}
              showsVerticalScrollIndicator={false}/>

            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({

  container : {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerView: {
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1.5,
    borderColor: '#30384d'

  },
  headerTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#30384d',
    fontFamily: 'Montserrat-Regular'
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    textAlign: 'left',
    color: '#30384d',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular'
    
  },
  inputWrap: {
    borderRadius: 5,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingLeft: 10
  },
  bodyView: {
    marginTop: 10,
    flex: 1,
    padding: 10,
    backgroundColor: '#eee'
  },
  itemView: {
    width: (width / 2) - 15,
    height: 230,
    
    marginLeft: 5,
    marginTop: 5
  },
  imageView: {
    height: 150,
    width: '100%'
  },
  shortTxt: {
    fontWeight: '500',
    fontSize: 14,
    color: '#7e8a9a',
    fontFamily: 'Montserrat-Regular'
  }
  
});

export default App;


