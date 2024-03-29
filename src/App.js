import { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import GroupCount from "./components/GroupCount";
import DisplayGroups from "./components/DisplayGroups";
import GroupType from "./components/GroupType";
import logo from "./components/team-randomiser.png";

function App() {
  const [item, setItem] = useState("");
  //const [listArray, setListArray] = useState([]);
  const [listArray, setListArray] = useState([
    "Emma",
    "Lara",
    "Tiff",
    "Suzie",
    "Imogen",
    "Charlotte",
    "Pascale",
    "Sian",
    "Emma P",
  ]);
  const [groupCount, setGroupCount] = useState(1);
  const [groupArray, setGroupArray] = useState([[]]);
  const [randomise, setRandomise] = useState(false);
  const [isGroupCount, setIsGroupCount] = useState(true);

  function handleSubmit() {
    if (item.length > 0) {
      setListArray([...listArray, item]);
      setItem("");
    } else {
      return;
    }
  }

  function handleDeleteListItem(index) {
    let newListArray = [...listArray];
    newListArray.splice(index, 1);
    setListArray(newListArray);
  }

  function handleGroupAddition() {
    // if (listArray.length === 0) {
    //   return;
    // } else {
    setGroupCount(groupCount + 1);
    // }
  }
  function handleGroupSubtraction() {
    if (groupCount === 0) {
      return;
    } else {
      setGroupCount(groupCount - 1);
    }
  }

  function resetList() {
    setListArray([]);
    resetGroups();
  }

  function resetGroups() {
    let emptyArray = [];
    if (isGroupCount) {
      for (let i = 0; i < groupCount; i++) {
        emptyArray.push([]);
      }
    } else {
      for (let i = 0; i < Math.ceil(listArray.length / groupCount); i++) {
        emptyArray.push([]);
      }
    }
    setGroupArray(emptyArray);
  }

  function handleRandomise() {
    resetGroups();
    setRandomise(true);
  }

  // useEffect(() => {
  //   console.log(groupArray);
  // }, [groupArray]);

  useEffect(() => {
    if (randomise === true) {
      console.log("fred");
      function generateGroups() {
        let listArrayCopy = [...listArray];
        let groupIterations = 0;
        let groupSize = 0;
        if (isGroupCount) {
          groupIterations = Math.ceil(listArray.length / groupCount);
        } else {
          groupIterations = groupCount;
        }
        if (isGroupCount) {
          groupSize = groupCount;
        } else {
          groupSize = Math.ceil(listArray.length / groupCount);
        }
        for (let i = 0; i < groupIterations; i++) {
          for (let j = 0; j < groupSize; j++) {
            if (listArrayCopy.length === 0) {
              break;
            }
            let randomNumber = Math.floor(Math.random() * listArrayCopy.length);
            let newArray = [...groupArray];
            newArray[j].push(listArrayCopy[randomNumber]);
            setGroupArray(newArray);
            listArrayCopy.splice(randomNumber, 1);
            console.log(listArrayCopy);
          }
        }
      }
      generateGroups();
      setRandomise(false);
    }
  }, [randomise]);

  // useEffect(() => {
  //   if (randomise) {
  //     console.log("fred");
  //     const timer = setTimeout(() => {
  //       generateGroups();
  //       console.log("This will run after 1 second!");
  //     }, 10);

  //     setRandomise(false);
  //     return () => clearTimeout(timer);
  //   }
  // }, [randomise]);

  return (
    <div className="app-container">
      <h1 className="app-title" data-testid="app-title-1">
        Team Randomiser
      </h1>
      <img className="app-logo" src={logo} alt="randomiser-logo" />
      <Input
        onSubmit={handleSubmit}
        item={item}
        setItem={setItem}
        handleReset={resetList}
      />
      <List listArray={listArray} handleDelete={handleDeleteListItem} />
      <GroupType
        isGroupCount={isGroupCount}
        setIsGroupCount={setIsGroupCount}
      />
      <GroupCount
        subtraction={handleGroupSubtraction}
        addition={handleGroupAddition}
        groupCount={groupCount}
      />
      <div className="randomise-container">
        <button
          className="randomise-button"
          data-testid="randomise-button"
          onClick={handleRandomise}
        >
          Randomise
        </button>
      </div>
      {groupArray[0].length > 0 && <DisplayGroups groupArray={groupArray} />}
    </div>
  );
}

export default App;
