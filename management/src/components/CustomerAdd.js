import React from "react";
const axios = require('axios');

class CustomerAdd extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName : '',
            birthday:'',
            gender : '',
            job :'',
            fileName: ''
        }
    }

    handleFormSubmit=(e)=>{
        e.preventDefault()
        this.addCustomer()
            .then((response)=>{
                console.log(response.data);
            })
    }

    handleFileChange = (e)=>{
        this.setState({
            file: e.target.files[0],
            fileName : e.target.value
        })
    }

    handleValueChange=(e)=>{
        let nextState={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    addCustomer = () =>{
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.name);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config={
            headers:{
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url,formData,config);
    }
    
    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>customer adding</h1>
                profile image : <input type="file" name="file" file={this.state.file} value ={this.state.fileName} onChange={this.handleFileChange}/><br/>
                name : <input type="text" name="userName" file={this.state.userName} value ={this.state.userName} onChange={this.handleValueChange}/><br/>
                profile image : <input type="text" name="birthday" file={this.state.birthday} value ={this.state.birthday} onChange={this.handleValueChange}/><br/>
                profile image : <input type="text" name="gender" file={this.state.gender} value ={this.state.gender} onChange={this.handleValueChange}/><br/>
                profile image : <input type="text" name="job" file={this.state.job} value ={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">adding</button>
            </form>
        )
    }

}

export default CustomerAdd;