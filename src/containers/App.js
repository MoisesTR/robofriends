import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css"

function App () {

    const [searchField, setSearchField] = useState("");
    const [robots, setRobots ] = useState([]);

    useEffect( () => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then( response => response.json())
        .then( users => {
            setRobots(users);
        });
    }, []);

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    };

    const filteredRobots = robots.filter((robot) => {
        return robot.name
            .toLocaleLowerCase()
            .includes(searchField.toLocaleLowerCase());
    });

    if (!robots.length) {
        return <h1 className="tc">Loading</h1>
    }

    return (
        <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    );
}

export default App;
