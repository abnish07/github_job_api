import React from 'react'
import style from './Jobapi.module.css'
import { v4 as uuidv4 } from 'uuid';

const axios = require('axios').default;

export default class Jobapi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            location: '',
            JobDB: [],
            date: new Date(),
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleInput = () => {
        this.setState({
            type: !this.state.type
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.get("https://jobs.github.com/positions.json?", {
            params: {
                description: this.setState.description,
                location: this.state.location
            }
        }).then(res =>
            this.setState({

                JobDB: res.data
            })
        )
    }

    render() {
        console.log(this.state.JobDB)
        var year = Date.now()
        return (
            <>
                <div>

                    <form className="m-3 ml-5" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="col-3">
                                <label>Description:</label>
                                <input name="description" value={this.state.description} onChange={this.handleChange} type="text" className="form-control" placeholder="Job Title" />
                            </div>
                            <br />

                            <div className="col-3">
                                <label >Location:</label>
                                <input name="location" value={this.state.location} type="text" onChange={this.handleChange} className="form-control" placeholder="Location" />
                            </div>

                            <div className="form-check col-1 mt-4 pt-3 ml-5">
                                <input className="form-check-input" type="checkbox" value={this.state.type} onChange={this.handleInput} />
                                <label className="form-check-label" >
                                    Full Time
                                    </label>
                            </div>
                            <div className="col-2 mt-4 pt-1">
                                <button className="btn btn-primary" type="submit">Search</button>
                            </div>
                        </div>
                    </form>




                    <div className="shadow p-3 mb-5 bg-white rounded col-8 p-3 ml-5" >


                        <h3 className="text-center">Showing {this.state.JobDB.length} Jobs</h3>
                        {this.state.JobDB.map(elem =>
                            <div key={uuidv4()} >
                                <table className="table table-hover p-3">
                                    <tbody>
                                        <tr >

                                            <td><a href={elem.url} target="blank"><strong>{elem.title}</strong></a>
                                                <br />
                                                <a href={elem.company_url} className="text-muted" target="blank">
                                                    {elem.company}</a>
                                                <p className="text-success"><strong> {elem.type}</strong></p>
                                            </td>
                                            <td className="align-middle text-right">{elem.location}

                                                <br />
                                                <p className="text-muted"><small>{this.state.date.getFullYear()}</small></p>  </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}