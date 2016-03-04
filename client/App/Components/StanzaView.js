var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var Icon = require('react-native-vector-icons/FontAwesome');
var IconIon = require('react-native-vector-icons/Ionicons');
var api = require('../Utils/api');

var {
  View,
  StyleSheet,
  Stanza,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActionSheetIOS,
  Text,
  StatusBarIOS,
} = React;

class StanzaView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      touched: false,
      favorited: false,
      uploader: undefined,
      views: undefined,
      id: this.props.id || this.props.route.id,
      text: this.props.text || this.props.route.text,
      userId: this.props.userId || this.props.route.userId
    }
    api.getStanzaData(this.state.id, this.state.userId, (data) => {
      var data = JSON.parse(data);
      this.setState({
        views: data.views,
        uploader: data.username,
        favorited: data.favorited
      })
    })
  }

  componentWillUnmount() {
    if(this.props.showStatusBar) {this.props.showStatusBar();}
  }

  _closeStanza() {
    this.props.navigator.pop();
    if(this.props.showStatusBar) {this.props.showStatusBar();}
  }

  _favoriteStanza() {
    api.toggleFavorite(this.state.userId, this.state.id, (result) => {
      this.state.favorited ? this.setState({favorited:false}) : this.setState({favorited:true})
    });
  }

  _shareStanza() {
    // ActionSheetIOS.showShareActionSheetWithOptions({
    //   text: this.state.text,
    //   subject: 'Checkout this post I found From PhotoDrop',
    // },
    // (error) => alert(error),
    // (success, method) => {
    //   var text;
    //   if (success) {
    //     text = `Shared via ${method}`;
    //   } else {
    //     text = 'You didn\'t share';
    //   }
    //   this.setState({text});
    // });
  }

  _touch() {
    if(this.state.touched===false) {
      this.setState({touched:true});
    } else if(this.state.touched===true) {
      this.setState({touched:false});
    }
    if(this.props.togglePagination) {this.props.togglePagination();}
  }

  render() {
    StatusBarIOS.setHidden(true);
    var username = this.state.uploader ? <Text style={styles.infoText}> Uploaded by: {this.state.uploader} </Text> : null;
    var views = this.state.views ? <Text style={styles.infoText}> Views: {this.state.views} </Text> : null;
    var text = this.state.text;
    if(this.props.togglePagination) {
      if(this.props.showsIndex===false) {
        return (
          <TouchableWithoutFeedback onPress={this._touch.bind(this)} style={styles.imageContainer}>
            <View style={styles.image}>
              <View style={styles.stanzaContainer}>
                <Text style={styles.stanzaText}>{this.state.text}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )
      }
      return (
        <TouchableWithoutFeedback onPress={this._touch.bind(this)} style={styles.imageContainer}>
          <View style={styles.image} onPress={this._touch.bind(this)}>
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <TouchableOpacity onPress={this._closeStanza.bind(this)} style={styles.closeButton}>
                  <IconIon name="ios-close-empty" size={45} color="white" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.rightContainer}>
                <TouchableOpacity onPress={this._favoriteStanza.bind(this)} style={styles.favoriteButton}>
                  {this.state.favorited ? <Icon name="heart" size={20} color="white" style={styles.favoriteIcon} /> : <Icon name="heart-o" size={20} color="white" style={styles.favoriteIcon} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._shareStanza.bind(this)} style={styles.shareButton}>
                  <IconIon name="ios-upload-outline" size={25} color="white" style={styles.shareIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.photoInfoContainer}>
                {username}
                {views} 
              </View>
            </View>
            <View style={styles.stanzaContainer}>
              <Text style={styles.stanzaText}>{this.state.text}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    } else {
      if(this.state.touched===false) {
        return (
          <TouchableWithoutFeedback onPress={this._touch.bind(this)} style={styles.imageContainer}>
            <View style={styles.image}>
              <View style={styles.stanzaContainer}>
                <Text style={styles.stanzaText}>{this.state.text}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )
      }
      return (
        <TouchableWithoutFeedback onPress={this._touch.bind(this)} style={styles.imageContainer}>
          <View style={styles.image} onPress={this._touch.bind(this)}>
            <View style={styles.buttonContainer}>
              <View style={styles.leftContainer}>
                <TouchableOpacity onPress={this._closeStanza.bind(this)} style={styles.closeButton}>
                  <IconIon name="ios-close-empty" size={45} color="white" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.rightContainer}>
                <TouchableOpacity onPress={this._favoriteStanza.bind(this)} style={styles.favoriteButton}>
                  {this.state.favorited ? <Icon name="heart" size={20} color="white" style={styles.favoriteIcon} /> : <Icon name="heart-o" size={20} color="white" style={styles.favoriteIcon} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={this._shareStanza.bind(this)} style={styles.shareButton}>
                  <IconIon name="ios-upload-outline" size={25} color="white" style={styles.shareIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.photoInfoContainer}>
                <Text style={styles.infoText}>
                  Uploaded by: {this.state.uploader}
                </Text>
                <Text style={styles.infoText}>
                  Views: {this.state.views}
                </Text>
              </View>
            </View>
            <View style={styles.stanzaContainer}>
              <Text style={styles.stanzaText}>{this.state.text}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }
}

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  image: {
    flex: 1
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'transparent',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor:'transparent',
  },
  closeButton:{
    width:50,
    height:50,
    backgroundColor:'rgba(0,0,0,0.3)',
    borderRadius:35,
    alignItems:'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    margin: 15,
  },
  shareButton:{
    width:50,
    height:50,
    backgroundColor:'rgba(0,0,0,0.3)',
    borderRadius:35,
    alignItems:'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 15,
    marginTop: 15
  },
  favoriteButton:{
    width:50,
    height:50,
    backgroundColor:'rgba(0,0,0,0.3)',
    borderRadius:35,
    alignItems:'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 15,
    marginRight: 5,
  },
  closeIcon:{
    width:60,
    height:60,
    paddingTop: 7,
    paddingLeft: 21
  },
  shareIcon:{
    width:60,
    height:35,
    paddingTop: 4,
    paddingLeft: 22
  },
  favoriteIcon:{
    width:35,
    height:35,
    paddingTop: 7.5,
    paddingLeft: 7.5
  },
  photoInfoContainer:{
    position: 'absolute',
    bottom: 14,
    left: 14,
  },
  infoText:{
    fontSize: 16,
    fontFamily: 'circular',
    color: 'black'
  },
  stanzaText:{
    fontSize: 30,
    fontFamily: 'circular'
  },
  stanzaContainer:{
    position: 'absolute',
    padding: 30,
    top: 80
  }
});

module.exports = StanzaView;