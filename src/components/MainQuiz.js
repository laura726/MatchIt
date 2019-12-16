import React from "react";
import { MatchingData } from "./MatchingData";
import backCard from "./backCard.jpeg";

class MatchingGame extends React.Component {
  //Initialize State
  state = {
    pairedAmount: 0,
    cardA: [],
    cardB: [],
    tries: 0,
    restrictedClick: false,
    restrictedMessage: ""
  };

  //Checks for cards that should not be clicked
  checkRestrictions = answer => {
    const { restrictedClick, restrictedMessage } = this.state;
    //Checks if card already paired
    if (answer.paired === true) {
      this.setState({
        restrictedClick: true,
        restrictedMessage: "Card already paired. Please try another card"
      });
    }
    //Checks if clicking on same card
    else if (answer.display === true) {
      this.setState({
        restrictedClick: true,
        restrictedMessage: "Card already clicked. Please try another card"
      });
    }
  };

  // Set to Initial Value
  setInitial = addPaired => {
    const { pairedAmount } = this.state;
    this.setState({
      pairedAmount: pairedAmount + addPaired,
      cardA: 0,
      cardB: 0,
      tries: 0
    });
  };

  //Initial Check
  checkAnswer = answer => {
    this.checkRestrictions(answer);

    this.timer2 = setTimeout(() => {
      if (this.state.restrictedClick === false) {
        MatchingData[answer.id].display = true;
        //Initiates State
        const { cardA, cardB, tries, pairedAmount } = this.state;

        this.setState({
          tries: tries + 1
        });

        setTimeout(() => {
          if (this.state.tries === 1) {
            this.setState({
              cardA: answer
            });
          } else {
            this.setState({
              cardB: answer
            });
            this.timer3 = setTimeout(() => {
              if (this.state.cardA.value == this.state.cardB.value) {
                MatchingData[this.state.cardA.id].paired = true;
                MatchingData[this.state.cardB.id].paired = true;
                this.setInitial(1);
              } else {
                this.timer = setTimeout(
                  (MatchingData[this.state.cardA.id].display = false),
                  (MatchingData[this.state.cardB.id].display = false),
                  1000
                );

                this.timer2 = setTimeout(() => {
                  this.setInitial(0);
                }, 800);
              }
            }, 800);
          }
        }, 500);
      }
      this.setState({
        restrictedClick: false,
        restrictedMessage: ""
      });
    }, 800);
  };

  render() {
    return (
      <div className="result">
        <h3>Let's Match! </h3>
        <div>
          Click on Cards to start pairing
          <br />
          {this.state.restrictedClick ? (
            <div>{this.state.restrictedMessage}</div>
          ) : null}
          <ul>
            {MatchingData.map((item, index) => (
              <li
                className="ui floating message options"
                key={index}
                onClick={() => {
                  this.checkAnswer(item);
                }}
              >
                {item.display ? (
                  <img src={item.image} />
                ) : (
                  <img src={backCard} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MatchingGame;
