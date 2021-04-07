import axios from 'axios';

const CUSTOMERS_API_URL = "http://localhost:8080/customers";
// const CUSTOMERS_SEARCH_URL = "http://localhost:8080/customers/search";

class CustomerService {
    
    getCustomers() {
        return axios.get(CUSTOMERS_API_URL);
    }

    createCustomer(customer) {
        return axios.post(CUSTOMERS_API_URL, customer);
    }

    getCustomerById(customerId) {
        return axios.get(CUSTOMERS_API_URL + '/' + customerId);
    }

    updateCustomerAddress(customerId, address) {
        return axios.put(CUSTOMERS_API_URL + '/' + customerId, address);
    }

    findCustomerByName(name) {
        return axios.get(CUSTOMERS_API_URL + '/search?name=' + name);
    }
}

export default new CustomerService()