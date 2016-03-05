          { this.state.closeAudioLocations.map((audioLocation) => {
              return (
               <MapView.Marker coordinate={{latitude: audioLocation.loc.coordinates[1], longitude: audioLocation.loc.coordinates[0]}} onPress={this.showAudio(audioLocation._id, audioLocation.text)}>
                 <RedAudioMarker navigator={this.props.navigator}/>
               </MapView.Marker>
             )}
            )
          }