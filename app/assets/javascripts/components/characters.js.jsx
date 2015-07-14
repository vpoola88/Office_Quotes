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
      <div className="characters" >
        {characterNodes}
        <CharacterForm updateCharacters={this.getCharacters} />
      </div>
    );
  }
});

var Character = React.createClass({
  render: function(){
    return (
      <div className="col-xs-6">
        <blockquote>
          <p>{this.props.characterQuote}</p>
          <footer>{this.props.characterName}</footer>
        </blockquote>
      </div>
    );
  }
});

var CharacterLink = React.createClass({
  getForm: function(event){
    event.preventDefault();
      $.ajax({
        url: "/characters/new",
        method: "get",
        dataType: 'json',
        success: function(response){
          console.log(response)
          alert(response)
        },
        error: function(response){
          console.log('fail')
          console.log(response)
          $('.link').append(response.responseText)
        }
      });
    },
  render: function(){
    return (
      <div className="link" onClick={this.getForm}>
        <a href="/characters/new" className="btn btn-primary">Create Character</a>
      </div>
    );
  }
});


var CharacterForm = React.createClass({
  getInitialState: function(){
    return {
      newCharacter: ""
    };
  },

  handleSubmit: function(event){
    event.preventDefault();
    var characterForm = this;

    var name = React.findDOMNode(this.refs.name).value.trim();
    var quote = React.findDOMNode(this.refs.quote).value.trim();

    var request = $.ajax({
      type: 'POST',
      url: '/characters',
      data:
        { character:
          {
            realBadAssShit: "scary",
            name: name,
            quote: quote
          }
        },
      dataType: 'JSON'
    });
    request.done(function(newCharacter) {
      characterForm.props.updateCharacters();
    });
    request.fail(function(xhr, status, error) {
      alert('fuck you');
    });

  },

  render: function() {
    return (
      <div className="row">
        <form id="section" className="col-xs-12" ref="coolForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Character Name:" ref="name" />
          <input type="text" placeholder="Quote:" ref="quote" />
          <input type="submit" value="Create Quote!" />
        </form>
      </div>
    );
  }
});


