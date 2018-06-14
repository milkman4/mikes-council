import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Button from '@material-ui/core/Button';

// const zipKey =
//   'XPnNqFcJSF17nI5bgHu383FtrX76vuGDyZPa0Pzag9sjHcpj4OhXYbmJrw8FUzBJ';
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

class App extends Component {
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
  }
  state = {
    name: '',
    email: '',
    zip: '',
    zipSearch: '',
    submitted: false,
    showSnackbar: false,
    radius: 50,
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = e => {
    console.log(this.database);
    const { name, email, zip } = this.state;
    this.database.ref('users/' + email).set({
      name,
      email,
      zip,
    });
    this.setState({
      submitted: true,
      showSnackbar: true,
      name: '',
      email: '',
      zip: '',
    });
  };
  handleClose = () => {
    this.setState({
      showSnackbar: false,
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
    }
  };
  render() {
    const { classes } = this.props;
    const { showSnackbar } = this.state;

    return (
      <div className="App">
        <form className={classes.container}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Interested in participating in Mike's Groups?
              </Typography>
            </Toolbar>
          </AppBar>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="email"
            label="email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            id="zip"
            label="zip code"
            className={classes.textField}
            value={this.state.zip}
            onChange={this.handleChange('zip')}
            margin="normal"
          />
          <Button className={classes.button} onClick={this.handleSubmit}>
            Send to Mike
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={showSnackbar}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">Submitted to Mike - stay tuned!</span>
            }
          />
        </form>

        <div>
          Get Users by Zip code
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
