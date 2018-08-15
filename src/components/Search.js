import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const zipKey =
  'js-2VR2cissqvjFctMmGh4Yh5PjHeE3HJKYrx5HqV6lgms2hPqy6J5bGeGdnpQqLDh2';
var firebase = require('firebase');

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    display: 'block',
    margin: 'auto',
    marginTop: '30px',
    width: '200px',
    padding: '20px',
  },
});

class Search extends Component {
  componentDidMount() {
    var config = {
      apiKey: 'AIzaSyDHYKD3oSxOaWbYFa2ShOEUg0jfOwdNrFE',
      authDomain: 'mikesgroups-e6036.firebaseapp.com',
      databaseURL: 'https://mikesgroups-e6036.firebaseio.com',
      projectId: 'mikesgroups-e6036',
      storageBucket: 'mikesgroups-e6036.appspot.com',
      messagingSenderId: '1014578643144',
    };
    var app = firebase.initializeApp(config);
    this.database = firebase.database();
  }
  state = {
    zipSearch: '',
    radius: 50,
    filteredUserResults: [],
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  searchZips = async () => {
    const { radius, zipSearch } = this.state;
    const cors = await fetch(
      `https://www.zipcodeapi.com/rest/${zipKey}/radius.json/${zipSearch}/${radius}/mile/minimal`
    );
    const results = await cors.json();
    if (results.zip_codes) {
      const zipCodes = results.zip_codes.map(result => {
        return result.zip_code;
      });

      var ref = firebase.database().ref('users');
      const snapshot = await ref.once('value');
      const usersArray = Object.values(snapshot.val());

      const filteredUserArray = usersArray.filter(userData => {
        return zipCodes.includes(userData.zip);
      });
      this.setState({
        filteredUserResults: filteredUserArray,
      });
      console.log(filteredUserArray);
    }
  };
  renderListOfEmails = () => {
    if (this.state.filteredUserResults.length === 0) return null;
    return this.state.filteredUserResults.map(user => {
      return (
        <li>
          {user.name} - {user.email}
        </li>
      );
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className="Search">
        <div>
          Get Users by Zip code (for mike's testing)
          <TextField
            id="zipSearch"
            label="zip of show"
            className={classes.textField}
            value={this.state.zipSearch}
            onChange={this.handleChange('zipSearch')}
            margin="normal"
          />
          <TextField
            id="radius"
            label="radius (mi)"
            className={classes.textField}
            value={this.state.radius}
            onChange={this.handleChange('radius')}
            margin="normal"
          />
          <Button className={classes.button} onClick={this.searchZips}>
            Search
          </Button>
          <div>
            <ul>{this.renderListOfEmails()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
