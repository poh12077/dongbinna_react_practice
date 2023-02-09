import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogTitle, ThemeProvider } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            }).catch((error) => {
                console.log(error)
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open:false
        })
        // window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} >
                    customer adding
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>customer adding</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file" >
                            <Button variant="contained" color="primary" component="span" name="file" >
                                {this.state.fileName==="" ? "select profile image": this.state.fileName }
                            </Button>
                        </label>
                        <br/>
                        <TextField label="name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label="birthday" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                        <TextField label="gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label="job" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit} >add</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose} >close</Button>
                    </DialogActions>
                </Dialog>

            </div>

            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>customer adding</h1>
            //     profile image : <input type="file" id="profileImage" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
            //     name : <input type="text" name="userName"  value={this.state.userName} onChange={this.handleValueChange} /><br />
            //     birthday : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
            //     gender : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
            //     job : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
            //     <button type="submit">adding</button>
            // </form>
        )
    }


}

export default withStyles(styles)(CustomerAdd) ;