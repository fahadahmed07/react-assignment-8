import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forces: [],
            crimeCategories: [],
            loader: true,
            isDashboard: true,
            isForce: false,
            isCrimeCategories: false,
            forcesSearchText: '',
            crimeCategoriesSearchText: '',
            dashboardStyle: 'nav-link text-uppercase text-white bg-dark rounded',
            forcesStyle: 'nav-link text-uppercase text-dark',
            crimeCategoriesStyle: 'nav-link text-uppercase text-dark',
        };
        this.searchForce = this.searchForce.bind(this);
        this.searchCrimeCategories = this.searchCrimeCategories.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.showForces = this.showForces.bind(this);
        this.showCrimeCategories = this.showCrimeCategories.bind(this);
    }

    componentDidMount() {
        // Fatching date from API
        fetch('https://data.police.uk/api/forces').then(results => results.json()).then(response => {
            // Setstate
            this.setState({
                forces: response,
            })
        })
        // Fatching date from API
        fetch('https://data.police.uk/api/crime-categories').then(results => results.json()).then(response => {
            // Setstate    
            this.setState({
                crimeCategories: response,
                loader: false,
            })
        })
    }

    // Show dashboard section and controlling tab styles
    showDashboard(){
        this.setState({ 
            isDashboard: true,
            isForce: false,
            isCrimeCategories: false,
            forcesSearchText: '',
            crimeCategoriesSearchText: '',
            dashboardStyle: 'nav-link text-uppercase text-white bg-dark rounded',
            forcesStyle: 'nav-link text-uppercase text-dark',
            crimeCategoriesStyle: 'nav-link text-uppercase text-dark',
        })
    }

    // Show forces section and controlling tab styles    
    showForces(){
        this.setState({ 
            isDashboard: false,
            isForce: true,
            isCrimeCategories: false,
            forcesSearchText: '',
            crimeCategoriesSearchText: '',
            dashboardStyle: 'nav-link text-uppercase text-dark',
            forcesStyle: 'nav-link text-uppercase text-white bg-dark rounded',
            crimeCategoriesStyle: 'nav-link text-uppercase text-dark',
        })
    }

    // Show Crime Categories section and controlling tab styles
    showCrimeCategories(){
        this.setState({ 
            isDashboard: false,
            isForce: false,
            isCrimeCategories: true,
            forcesSearchText: '',
            crimeCategoriesSearchText: '',
            dashboardStyle: 'nav-link text-uppercase text-dark',
            forcesStyle: 'nav-link text-uppercase text-dark',
            crimeCategoriesStyle: 'nav-link text-uppercase text-white bg-dark rounded',
        })
    }
    
    // Function for serach forces by name
    searchForce(e){
        // Distructing
        const { forces } = this.state;
        // Set value of search text
        const text = e;
        // Use filter method to find the value from an array
        const resultSearchForce = forces.filter((val) => {
            // Use substring method to get the axact characters of name which is matched by search text
            return val.name.substring(0, text.length).toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1;
        })
        // Now set in the stated that array which is return by filter method
        this.setState({
            resultSearchForce,
            forcesSearchText: text,
        })
    }

    // Function for serach crime categories by name    
    searchCrimeCategories(e){
        // Distructing
        const { crimeCategories } = this.state;
        // Set value of search text
        const text = e;
        // Use filter method to find the value from an array
        const resultSearchCrimeCategories = crimeCategories.filter((val) => {
            // Use substring method to get the axact characters of name which is matched by search text
            return val.name.substring(0, text.length).toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1;
        })
        // Now set in the stated that array which is return by filter method
        this.setState({
            resultSearchCrimeCategories,
            crimeCategoriesSearchText: text,
        })
    }

    render() {
        // Destructing
        const { forces, crimeCategories, loader, isDashboard, isForce, isCrimeCategories, forcesSearchText, resultSearchForce, crimeCategoriesSearchText, resultSearchCrimeCategories, dashboardStyle, forcesStyle ,crimeCategoriesStyle } = this.state;
        // If forcesSearchText length is not equal to 0 then it will save resultSearchForce in forcesArry otherwise it will save forces 
        const forcesArry = forcesSearchText.length ? resultSearchForce : forces
        // Use map function for getting data from array and set it in table
        let forcesData = forcesArry.map((val, ind) => {
            return (
                <tr key={ind + 1}>
                    <th scope="row">{ind + 1}</th>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                </tr>
            )
        })
        // If crimeCategoriesSearchText length is not equal to 0 then it will save resultSearchCrimeCategories in crimeCategoriesArry otherwise it will save crimeCategories 
        const crimeCategoriesArry = crimeCategoriesSearchText.length ? resultSearchCrimeCategories : crimeCategories
        // Use map function for getting data from array and set it in table
        let crimeCategoriesData = crimeCategoriesArry.map((val, ind) => {
            return (
                <tr key={ind + 1}>
                    <th scope="row">{ind + 1}</th>
                    <td>{val.url}</td>
                    <td>{val.name}</td>
                </tr>
            )
        })
        return (
            <div className="container my-5 py-5 border shadow rounded">
                <div className="row">
                    <div className="col-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className={dashboardStyle} onClick={() => this.showDashboard()}><strong>Dashboard</strong></span>
                            </li>
                            <li className="nav-item">
                                <span className={forcesStyle} onClick={() => this.showForces()}><strong>Forces</strong></span>
                            </li>
                            <li className="nav-item">
                                <span className={crimeCategoriesStyle} onClick={() => this.showCrimeCategories()}><strong>Crime Categories</strong></span>
                            </li>
                        </ul>
                    </div>
                    {
                        // Check loader state is ture or false
                        !loader ? <div className="col-9">
                            {/* Dashboard */}
                            {
                                // check isDashboard state is true or false 
                                isDashboard ? <div className="col-12">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <h1 className="h5 text-uppercase mt-2">Dashboard</h1>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group float-right">
                                                <input type="text" className="form-control border-dark" placeholder="Search..." aria-describedby="search-bar" />
                                            </div>
                                        </div>
                                    </div>
                                </div> : null
                            }
                            {/* Forces Data */}
                            {
                                // check isForce state is true or false 
                                isForce ? <div className="col-12">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <h1 className="h5 text-uppercase mt-2">Force</h1>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group float-right">
                                                <input type="text" onChange={(e)=>{this.searchForce(e.target.value)}} className="form-control border-dark"  placeholder="Search..." aria-describedby="search-bar" />
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Force Id</th>
                                                <th scope="col">Force Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {forcesData}
                                        </tbody>
                                    </table>
                                </div> : null
                            }
                            {/* Crime Categories Data */}
                            {
                                // check isCrimeCategories state is true or false 
                                isCrimeCategories ? <div className="col-12">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <h1 className="h5 text-uppercase mt-2">Crime Categories</h1>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group float-right">
                                                <input type="text" onChange={(e)=>{this.searchCrimeCategories(e.target.value)}} className="form-control border-dark" placeholder="Search..." aria-describedby="search-bar" />
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">URL</th>
                                                <th scope="col">Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {crimeCategoriesData}
                                        </tbody>
                                    </table>
                                </div> : null
                            }
                        </div> : <h1 className="h5 text-uppercase mt-2">Loading...</h1>
                    }
                </div>
            </div>
        )
    }
}