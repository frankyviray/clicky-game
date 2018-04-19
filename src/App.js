import React, {
    Component
} from 'react';
import friends from "./cards.json";
import Pictures from "./components/ClickCard/ClickCard";


var score = 0;
var topScore = 0;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class App extends Component {

    state = {
        friends: friends,
        score: score,
        topScore: 0,
        text: "",
        click: []
    };

    toggleClick = (id) => {
        var newObj = friends[id];
        if (this.state.click.indexOf(id) === -1) {
            score++;

            var clickedArray = this.state.click;
            clickedArray.push(id);

            shuffleArray(friends);
            this.setState({
                friends: friends,
                score: score,
                click: clickedArray
            });
        } else {
            topScore = (topScore < score) ? score : topScore;
            console.log(topScore);
            score = 0;
            for (var i = 0; i < friends.length; i++)
                friends[i].chosen = false;
            shuffleArray(friends);
            this.setState({
                friends: friends,
                topScore: topScore,
                text: "Incorrect try again!"
            });
        }

    };
    render() {
        return ( < div >
            <div >
            <h5 > Score: {
                this.state.score
            } | High Score: {
                this.state.topScore
            } </h5> </div> <div className = "container" >
            <div className = "row" >
            <div className = "col-12 text-center" >
            <h5 > {
                this.state.text
            } </h5> </div> </div> <div className = "row" > {
                this.state.friends.map((friend, index) => ( <div className = "col-4" >
                    <Pictures name = {
                        friend.name
                    }
                    key = {
                        friend.id
                    }
                    id = {
                        index
                    }
                    image = {
                        friend.image
                    }
                    toggleClick = {
                        this.toggleClick
                    }
                    chosen = {
                        friend.chosen
                    }
                    /> </div>
                ))
            } </div>

            </div>

            </div>
        );
    }
}

export default App;