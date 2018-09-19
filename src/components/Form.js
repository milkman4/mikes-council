import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
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

const checkboxOptions = {
  a: {
    text: "I am interested in participating in a men's group.",
    key: 'a',
  },
  b: {
    text: 'I am interested in participating in a coed group',
    key: 'b',
  },
  c: {
    text: 'I am interested in a coed relational workshop that includes yoga.',
    key: 'c',
  },
  d: {
    text: 'I can provide or help Mike find a space to host a group in my area.',
    key: 'd',
  },
  e: {
    text:
      'I have group facilitation experience and can assist Mike in order to accommodate a larger group.', // more details?
    key: 'e',
  },
};

class Form extends PureComponent {
  state = {
    name: '',
    email: '',
    zip: '',
    zipSearch: '',
    submitted: false,
    showSnackbar: false,
    checkboxes: { a: false, b: false, c: false, d: false, e: false },
    checkboxesExpand: { a: '', b: '', c: '', d: '', e: '' },
  };

  handleChange = name => event => {
    this.setState({
      checkboxesExpand: Object.assign({}, this.state.checkboxesExpand, {
        [name]: event.target.value,
      }),
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({
      checkboxes: Object.assign({}, this.state.checkboxes, {
        [name]: event.target.checked,
      }),
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

  renderCheckboxes = () => {
    const { classes } = this.props;

    return Object.values(checkboxOptions).map(option => {
      return (
        <div className={classes.checkbox} key={`option-${option.key}`}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkboxes[option.key]}
                onChange={this.handleCheckboxChange(option.key)}
                value={this.state.checkboxes[option.key]}
              />
            }
            label={option.text}
          />
          <Collapse in={this.state.checkboxes[option.key]} timeout={300}>
            <TextField
              id={`textField-${option.key}`}
              label="add some details, if you'd like"
              multiline={true}
              className={classes.textArea}
              value={this.state.checkboxesExpand[option.key]}
              onChange={this.handleChange(option.key)}
              margin="normal"
              fullWidth
            />
          </Collapse>
        </div>
      );
    });
  };
  render() {
    const { classes } = this.props;
    const { showSnackbar } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              align="center"
              className={classes.header}
            >
              Council Interest Form
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form className={classes.container}>
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
                message={
                  <span id="message-id">Submitted to Mike - stay tuned!</span>
                }
              />
              <FormGroup>{this.renderCheckboxes()}</FormGroup>
              <Button className={classes.button} onClick={this.handleSubmit}>
                Send to Mike
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
// <div className={classes.checkbox}>
// <FormControlLabel
//   control={
//     <Checkbox
//       checked={this.state.genderGroup}
//       onChange={this.handleCheckboxChange('genderGroup')}
//       value="genderGroup"
//     />
//   }
//   label="Are you interested in a Men's or Women's-only group?"
// />
// <Collapse in={this.state.genderGroup} timeout={300}>
//   <TextField
//     id="genderGroupDetails"
//     label="add some details"
//     multiline={true}
//     className={classes.textArea}
//     value={this.state.genderGroupDetails}
//     onChange={this.handleChange('genderGroupDetails')}
//     margin="normal"
//     fullWidth
//   />
// </Collapse>
// </div>
// <div className={classes.checkbox}>
// <FormControlLabel
//   control={
//     <Checkbox
//       checked={this.state.groupAddons}
//       onChange={this.handleCheckboxChange('groupAddons')}
//       value="groupAddons"
//     />
//   }
//   label="Would you like to participate in a council that included yoga, escatic dance or some other complementary activity?"
// />
// <Collapse in={this.state.groupAddons} timeout={300}>
//   <TextField
//     id="groupAddonsDetails"
//     label="add some details"
//     multiline={true}
//     className={classes.textArea}
//     value={this.state.groupAddonsDetails}
//     onChange={this.handleChange('groupAddonsDetails')}
//     margin="normal"
//     fullWidth
//   />
// </Collapse>

export default withStyles(styles)(Form);
