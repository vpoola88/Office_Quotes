var CharacterBox = React.createClass({
  render: function(){
    return (
      <div className="characterBox">
        <CharacterList />
      </div>
    );
  }
});

var CharacterList = React.createClass({
  getInitialState: function(){
    return {
      characters: []
    }
  },

  componentDidMount: function() {
    this.getCharacters();
  },

  getCharacters: function(){
    var component = this;

    var request = $.ajax({
      url: '/characters',
      dataType: 'JSON',
      type: 'GET'
    });

    request.done(function(characterData){
      component.setState({ characters: characterData});
    });

    request.fail(function(xhr, status, error){
      console.error(xhr, status, error);
    });
  },

  render:function() {
    var characterNodes = this.state.characters.map(function(character) {
      return (
        <Character characterName={character.name} characterQuote={character.quote} />
      )
    });
    return (
      <div className="characters">
        {characterNodes}
      </div>
    );
  }
});

var Character = React.createClass({
  render: function(){
    return (
     <div>
      <h1>{this.props.characterName}</h1>
      <p>{this.props.characterQuote}</p>
    </div>
    );
  }
});


