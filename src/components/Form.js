import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  container: {
    width: '500px',
    margin: 'auto',
  },
  textField: {
    display: 'block',
    marginTop: '10px',
    width: '100%',
    margin: 'auto',
  },
  textArea: {
    width: '100%',
    marginTop: '10px',
  },
  header: {
    width: '100%',
    margin: 'auto',
    marginTop: '30px',
    textAlign: 'center',
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
    backgroundColor: 'forestGreen',
    color: 'white',
  },
  checkbox: {
    width: '100%',
    margin: 'auto',
    marginTop: '10px',
  },
});

class Form extends PureComponent {
  state = {
    name: '',
    email: '',
    zip: '',
    zipSearch: '',
    submitted: false,
    showSnackbar: false,
    hostAGroup: false,
    hostAGroupDetails: '',
    genderGroup: false,
    genderGroupDetails: '',
    groupAddons: false,
    groupAddonsDetails: '',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked,
    });
  };

  handleSubmit = e => {
    const { name, email, zip } = this.state;
    this.props.submitToDatabase({ name, email, zip });
    this.setState({
      submitted: true,
      showSnackbar: true,
      name: '',
      email: '',
      zip: '',
      hostAGroup: false,
    });
  };

  handleClose = () => {
    this.setState({
      showSnackbar: false,
    });
  };
  render() {
    const { classes } = this.props;
    const { showSnackbar } = this.state;
    return (
      <form className={classes.container}>
        <Typography
          variant="title"
          color="inherit"
          align="center"
          className={classes.header}
        >
          Interested in participating in a Authenic Relating Council with Mike?
        </Typography>
        <TextField
          id="name"
          label="name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          fullWidth
        />
        <TextField
          id="email"
          label="email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          fullWidth
        />
        <TextField
          id="zip"
          label="zip code"
          className={classes.textField}
          value={this.state.zip}
          onChange={this.handleChange('zip')}
          margin="normal"
          fullWidth
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showSnackbar}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Submitted to Mike - stay tuned!</span>}
        />
        <FormGroup>
          <div className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.hostAGroup}
                  onChange={this.handleCheckboxChange('hostAGroup')}
                  value="hostAGroup"
                />
              }
              label="Can you provide a space to host a group, or help Mike find a space in your area?"
            />
            <Collapse in={this.state.hostAGroup} timeout={300}>
              <TextField
                id="hostAGroupDetails"
                label="add some details"
                multiline={true}
                className={classes.textArea}
                value={this.state.hostAGroupDetails}
                onChange={this.handleChange('hostAGroupDetails')}
                margin="normal"
                fullWidth
              />
            </Collapse>
          </div>
          <div className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.genderGroup}
                  onChange={this.handleCheckboxChange('genderGroup')}
                  value="genderGroup"
                />
              }
              label="Are you interested in a Men or Women-only group?"
            />
            <Collapse in={this.state.genderGroup} timeout={300}>
              <TextField
                id="genderGroupDetails"
                label="add some details"
                multiline={true}
                className={classes.textArea}
                value={this.state.genderGroupDetails}
                onChange={this.handleChange('genderGroupDetails')}
                margin="normal"
                fullWidth
              />
            </Collapse>
          </div>
          <div className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.groupAddons}
                  onChange={this.handleCheckboxChange('groupAddons')}
                  value="groupAddons"
                />
              }
              label="Would you like to participate in a council that included yoga, escatic dance or some other complementary activity?"
            />
            <Collapse in={this.state.groupAddons} timeout={300}>
              <TextField
                id="groupAddonsDetails"
                label="add some details"
                multiline={true}
                className={classes.textArea}
                value={this.state.groupAddonsDetails}
                onChange={this.handleChange('groupAddonsDetails')}
                margin="normal"
                fullWidth
              />
            </Collapse>
          </div>
        </FormGroup>
        <Button className={classes.button} onClick={this.handleSubmit}>
          Send to Mike
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Form);
