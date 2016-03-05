        <Camera navigator={this.props.navigator} 
          latitude={this.state.latitude} 
          longitude={this.state.longitude} 
          params={this.state} 
          userId={this.props.route.userId} 
          _goToSettings={this._goToSettings.bind(this)} 
          _goToMap={this._goToMap.bind(this)}/>
        <MapView navigator={this.props.navigator} params={this.state} showsButtons={false} userId={this.props.route.userId}/>
        <AuthorView navigator={this.props.navigator} 
          latitude={this.state.latitude} 
          longitude={this.state.longitude} 
          params={this.state} 
          showsButtons={false} 
          userId={this.props.route.userId}/>



<TouchableOpacity onPress={_.once(this._cancelStanza.bind(this))} style={styles.noButton}>
  <IconIon name="ios-close-empty" size={60} color="#FC9396" style={styles.noIcon} />
</TouchableOpacity>

<TouchableOpacity style={styles.yesButton}>
  <IconIon name="ios-checkmark-empty" size={60} color="#036C69" style={styles.yesIcon} />
</TouchableOpacity>

 recordingNow: {
   width: 100,
   height: 100,
   borderRadius: 100,
   alignItems: 'center',
   backgroundColor: 'black',
   justifyContent: 'center',
   borderWidth: 1,
   borderColor: '#ededed',
   paddingLeft: 5,
   backgroundColor: 'red'
 }, 