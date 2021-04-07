import React, { Component } from 'react';
import CustomerService from '../service/CustomerService'

class ListCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.cancelButton = this.cancelButton.bind(this)

        this.onChangeSearchName = this.onChangeSearchName.bind(this)
        this.searchName = this.searchName.bind(this)
        this.getCustomers = this.getCustomers.bind(this)

        this.createCustomer = this.createCustomer.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.setCreateCustomer = this.setCreateCustomer.bind(this)
        this.setEditCustomer = this.setEditCustomer.bind(this)
        this.setActiveCustomer = this.setActiveCustomer.bind(this)

        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeMiddleName = this.onChangeMiddleName.bind(this)
        this.onChangeSex = this.onChangeSex.bind(this)

        this.onChangeCountry = this.onChangeCountry.bind(this)
        this.onChangeCity = this.onChangeCity.bind(this)
        this.onChangeRegion = this.onChangeRegion.bind(this)
        this.onChangeStreet = this.onChangeStreet.bind(this)
        this.onChangeHouse = this.onChangeHouse.bind(this)
        this.onChangeFlat = this.onChangeFlat.bind(this)

        this.state = {
            customers: [],
            currentCustomer: null,
            currentId: -1,
            searchName: "",

            editing: false,
            creating: false,
            onError: false,
            errorBody: [],

            editingAddress: {
                country: "",
                region: "",
                city: "",
                street: "",
                house: "",
                flat: ""
            },

            editingCustomer: {
                firstName: "",
                lastName: "",
                middleName: "",
                sex: "male",
                registredAddress: null,
                currentAddress: null
            }
        }
    }

    componentDidMount() {
        this.getCustomers()
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    searchName() {
        CustomerService.findCustomerByName(this.state.searchName)
        .then( res => {
            this.setState({
                customers: res.data
            });
        })
    }

    getCustomers() {
        CustomerService.getCustomers()
        .then(res => {
            this.setState({
                customers : res.data,
                onError: false,
                errorBody: []
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    ////////////////////////////

    createCustomer() {
        // console.log(this.state.editingAddress)
        // const eaddress = this.state.editingAddress
        // this.setState(res =>  ({
        //     editingCustomer: {
        //         ...res.editingCustomer,
        //         registredAddress: eaddress,
        //         currentAddress: {}
        //     }
        // }))
        
        this.state.editingCustomer.registredAddress = this.state.editingAddress
        this.state.editingCustomer.currentAddress = {}

        // console.log(this.state.editingCustomer.registredAddress)
        CustomerService.createCustomer(this.state.editingCustomer)
        .then( res => {
            this.setActiveCustomer(res.data, res.data.id)
            this.setState({
                creating: false,
                editingAddress: {
                    country: "",
                    region: "",
                    city: "",
                    street: "",
                    house: "",
                    flat: ""
                },
                editingCustomer: {
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    sex: "male",
                    registredAddress: null,
                    currentAddress: null
                }
            })
            this.getCustomers()
        })
        .catch(e => {
            this.errorHandle(e)
        })
    }

    updateAddress() {
        CustomerService.updateCustomerAddress(
            this.state.currentCustomer.id,
            this.state.editingAddress
        )
        .then( res => {
            this.setActiveCustomer(res.data, res.data.id)
            this.setState({
                editing: false,
                editingAddress: {
                    country: "",
                    region: "",
                    city: "",
                    street: "",
                    house: "",
                    flat: ""
                }
            })
            this.getCustomers()
        })
        .catch(e => {
            this.errorHandle(e)
        })
    }

    /////////////////////////////////

    setCreateCustomer() {
        this.setState({
            creating: true,
            editing: false,
        });
    }

    setEditCustomer() {
        this.setState(res => ({
            editing: true,
            creating: false,
            editingAddress: {
                ...res.currentCustomer.currentAddress
            }
        }));
    }

    setActiveCustomer(customer, index) {
        this.setState({
            currentCustomer: customer,
            currentId: index,
            editing: false,
            creating: false
        });
    }

    errorHandle(e) {
        this.setState({
            onError: true
        })
        if (e.response && e.response.data) {
            this.setState({
                errorBody : e.response.data.violations
            })}
    }

    ////////////////////////////////////

    cancelButton() {
        this.setState({
            editing: false,
            creating: false,
            onError: false,
            errorBody: [],
            searchName: ""
        })
        this.getCustomers()
    }

    onChangeFirstName(e) {
        const firstName = e.target.value;

        this.setState( res => ({
            editingCustomer: {
                ...res.editingCustomer,
                firstName: firstName
            }
        }))
    }

    onChangeLastName(e) {
        const lastName = e.target.value;

        this.setState( res => ({
            editingCustomer: {
                ...res.editingCustomer,
                lastName: lastName
            }
        }))
    }

    onChangeMiddleName(e) {
        const middleName = e.target.value;

        this.setState( res => ({
            editingCustomer: {
                ...res.editingCustomer,
                middleName: middleName
            }
        }))
    }

    onChangeSex(e) {
        let sex = e.target.value;

        this.setState( res => ({
            editingCustomer: {
                ...res.editingCustomer,
                sex: sex
            }
        }))
    }

    onChangeCountry(e) {
        const country = e.target.value;

        this.setState( res => ({
            editingAddress: {
                ...res.editingAddress,
                country: country
            }
        }))
    }

    onChangeRegion(e) {
        const region = e.target.value;

        this.setState( res => ({
            editingAddress: {
                ...res.editingAddress,
                region: region
            }
        }))
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState( res => ({
            editingAddress: {
                ...res.editingAddress,
                city: city
            }
        }))
    }

    onChangeStreet(e) {
        const street = e.target.value;

        this.setState( res => ({
            editingAddress: {
                ...res.editingAddress,
                street: street
            }
        }))
    }

    onChangeHouse(e) {
        const house = e.target.value;

        this.setState( res => ({
            editingAddress: {
                ...res.editingAddress,
                house: house
            }
        }))
    }

    onChangeFlat(e) {
        const flat = e.target.value;

        this.setState( res => ({
            editingAddress: {
                ...res.editingAddress,
                flat: flat
            }
        }))
    }

    render() {
        const {searchName, customers, currentId, creating, editing, currentCustomer, editingAddress} = this.state;

        return (
            <div className="list row">
                <div className="col-sd-6">
                    <h4>
                        Customer List
                        {" "}
                        <button className="btn btn-info" onClick={() => this.setCreateCustomer()}>Create customer</button>
                    </h4>
                    <div className="col-sd-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filter by Firstname and/or Lastname"
                                value={searchName}
                                onChange={this.onChangeSearchName}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-info"
                                    type="button"
                                    onClick={this.searchName}
                                >Filter</button>
                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={this.cancelButton}
                                >Cancel</button>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">
                        {customers && customers.map((customer, _index) => (
                            <li
                            className={"list-group-item list-group-item-action" + (customer.id === currentId ? " active" : "")}
                            onClick={() => this.setActiveCustomer(customer, customer.id)}
                            key={customer.id}
                            >
                                {customer.firstName + " "}{customer.middleName + " "}{customer.lastName}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-6">
                        {creating ? (
                            <div className="edit-form">
                                <h4 align="center">Create new customer</h4>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">First name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstname"
                                            placeholder="Enter first name"
                                            onChange={this.onChangeFirstName}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastname"
                                            placeholder="Enter last price"
                                            onChange={this.onChangeLastName}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="middleName">Middle name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="middlename"
                                            placeholder="Enter middle price"
                                            onChange={this.onChangeMiddleName}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sex">Sex:</label>
                                        <div onChange={this.onChangeSex}>
                                            <input type="radio" value="male" name="gender" defaultChecked /> Male 
                                            <input type="radio" value="female" name="gender" /> Female
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="form-group">
                                        <label htmlFor="country">Country:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            placeholder="Enter your country"
                                            onChange={this.onChangeCountry}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="region">Region:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="region"
                                            placeholder="Enter your region"
                                            onChange={this.onChangeRegion}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            placeholder="Enter your city"
                                            onChange={this.onChangeCity}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="street">Street:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="street"
                                            placeholder="Enter your street"
                                            onChange={this.onChangeStreet}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="house">House:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="house"
                                            placeholder="Enter your house number"
                                            onChange={this.onChangeHouse}    
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="flat">Flat:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="flat"
                                            placeholder="Enter your flat number"
                                            onChange={this.onChangeFlat}    
                                        />
                                    </div>
                                </form>
                                <div>
                                    <button className="btn btn-success" onClick={() => this.createCustomer(currentCustomer)}>Create</button>
                                        {" "}
                                    <button className="btn btn-info" onClick={() => this.cancelButton()}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                    {currentCustomer ? (
                                        <div> 
                                            {editing ? (
                                                <div className="edit-form">
                                                    <h4 align="center"> Customer, id: {currentCustomer.id}, address editing</h4>
                                                    <form>
                                                                            <div className="form-group">
                                                                <label htmlFor="country">Country:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="country"
                                                                    value={editingAddress.country}
                                                                    onChange={this.onChangeCountry}    
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="country">Region:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="region"
                                                                    value={editingAddress.region}
                                                                    onChange={this.onChangeRegion}    
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="country">City:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="city"
                                                                    value={editingAddress.city}
                                                                    onChange={this.onChangeCity}    
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="country">Street:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="street"
                                                                    value={editingAddress.street}
                                                                    onChange={this.onChangeStreet}    
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="country">House:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="house"
                                                                    value={editingAddress.house}
                                                                    onChange={this.onChangeHouse}    
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="country">Flat:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="flat"
                                                                    value={editingAddress.flat}
                                                                    onChange={this.onChangeFlat}    
                                                                />
                                                            </div>
                                                    </form>
                                                    <div>
                                                        <button className="btn btn-success" onClick={() => this.updateAddress()}>Save</button>
                                                            {" "}
                                                        <button className="btn btn-info" onClick={() => this.cancelButton()}>Cancel</button>
                                                    </div>
                                                </div>
                                                
                                                    ) : (
                                                        <div>
                                                            <h4 align="center">Customer description</h4>
                                                            <div>
                                                                <label>
                                                                    <strong>First name:</strong>
                                                                </label>{" "}
                                                                {currentCustomer.firstName}
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <strong>Middle name:</strong>
                                                                </label>{" "}
                                                                {currentCustomer.middleName}
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <strong>Last name:</strong>
                                                                </label>{" "}
                                                                {currentCustomer.lastName}
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <strong>Sex:</strong>
                                                                </label>{" "}
                                                                {currentCustomer.sex}
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <strong>Registration address:</strong>
                                                                </label>{" "}
                                                                {currentCustomer.registredAddress.country + ", "}{currentCustomer.registredAddress.region+ ", "}{currentCustomer.registredAddress.city+ ", "}{currentCustomer.registredAddress.street+ " "}{currentCustomer.registredAddress.house+ ", "}{currentCustomer.registredAddress.flat}
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <strong>Actual address:</strong>
                                                                </label>{" "}
                                                                {currentCustomer.currentAddress.country+ ", "}{currentCustomer.currentAddress.region+ ", "}{currentCustomer.currentAddress.city+ ", "}{currentCustomer.currentAddress.street+ " "}{currentCustomer.currentAddress.house+ ", "}{currentCustomer.currentAddress.flat}
                                                            </div>

                                                            <div>
                                                                <button className="btn btn-info" onClick={() => this.setEditCustomer()}>Edit actual address</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                    ) : (
                                        <div>
                                            <br/>
                                            <br/>
                                            <p align="center">Please, click on the customer or create new</p>
                                        </div>
                                    )}
                                </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ListCustomerComponent;