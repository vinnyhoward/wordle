"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const dict = [
  "apple",
  "bread",
  "dance",
  "eagle",
  "fruit",
  "grass",
  "heart",
  "light",
  "magic",
  "curry",
];

const fetchWord = () => {
  const randomIndex = Math.ceil(Math.random() * dict.length + 1);
  return dict[randomIndex];
};

const calculateFill = () => {
  const numInputs = 5;
  const numRows = 6;
  const inputs = Array.from({ length: numInputs }).fill("");
  const rows = Array.from({ length: numRows }).map(() => [...inputs]);
  return rows;
};

export default function Home() {
  const [word, setWord] = useState<string>(fetchWord());
  const [guessesArray, setGuessesArray] = useState<any[]>(calculateFill());
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [currentColIndex, setCurrentColIndex] = useState(0);
  const [isWinner, setWinner] = useState(false);
  const [isLoser, setLoser] = useState(false);

  const getWordHashMap = () => {
    const hash: any = {};
    if (word && word.length) {
      word.split("").forEach((letter) => {
        if (!hash[letter]) hash[letter] = 1;
        else hash[letter] += 1;
      });
    }
    return hash;
  };

  const wordHashMap = getWordHashMap();

  const handleChange = (event: any, outerIndex: number, innerIndex: number) => {
    const value = event.target.value;
    const re = /^[A-Za-z]+$/;
    if (re.test(value) && value !== " ") {
      if (innerIndex === 4 && outerIndex !== 5) {
        setCurrentRowIndex((currentRowIndex) => currentRowIndex + 1);
        setCurrentColIndex(0);
      } else {
        setCurrentColIndex((prevColIndex) => prevColIndex + 1);
      }

      const newArray = [...guessesArray];
      newArray[outerIndex][innerIndex] = value.toLowerCase();
      setGuessesArray(newArray);
    }
  };

  const getStyles = (outerIndex: number, innerIndex: number) => {
    const correctPlace = "bg-emerald-400";
    const incorrectPlace = "bg-amber-500";
    const error = "bg-slate-500";
    let styles = "";

    const letter = guessesArray[outerIndex][innerIndex];
    if (letter !== word[innerIndex] && wordHashMap[letter] > 0) {
      wordHashMap[letter] -= 1;
      styles = incorrectPlace;
    } else if (letter === word[innerIndex]) {
      styles = correctPlace;
    } else if (letter !== "") {
      styles = error;
    }

    return styles;
  };

  const renderInputList = () => {
    return guessesArray.map((inputs: any[], outerIndex: number) => {
      const isRowDisabled = outerIndex !== currentRowIndex;
      return (
        <div key={uuidv4()} className="flex flex-row">
          {inputs.map((letter, innerIndex) => {
            const styles = getStyles(outerIndex, innerIndex);
            const isDisabled = inputs.join("").length === 5;
            return (
              <input
                disabled={
                  isDisabled ||
                  isRowDisabled ||
                  letter !== "" ||
                  isWinner ||
                  isLoser ||
                  currentColIndex !== innerIndex
                }
                key={uuidv4()}
                className={`border-3 m-2 border-[5px] border-gray-700 h-[100px] 
                w-[100px] text-[42px] p-[30px] rounded-xl text-white ${styles}`}
                value={letter}
                onChange={(event) =>
                  handleChange(event, outerIndex, innerIndex)
                }
                maxLength={1}
                type="text"
              />
            );
          })}
        </div>
      );
    });
  };

  const onReset = () => {
    setWinner(false);
    setLoser(false);
    setGuessesArray(calculateFill());
    setWord(fetchWord());
    setCurrentRowIndex(0);
  };

  useEffect(() => {
    const wordArr = guessesArray.map((guess: any) => {
      if (guess) {
        return guess.join("");
      }
      return guess;
    });

    const isWinner = wordArr.includes(word);
    if (isWinner) {
      return setWinner(true);
    }

    if (currentRowIndex === 5 && guessesArray[5].join("").length === 5) {
      return setLoser(true);
    }
  }, [guessesArray, word, currentRowIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto justify-center w-[750px] bg-gray-800">
      <div className="flex flex-col mb-4">{renderInputList()}</div>
      <div className="w-full h-[75px] flex items-center justify-center flex flex-col">
        <span className="text-[18px] text-white my-3">
          {isWinner && "YOU WON DUDE"}
          {isLoser && "YOU LOST DUDE"}
        </span>
        <button
          onClick={onReset}
          className="btn w-full h-[70px] bg-orange-500 border-none text-white text-[26px] hover:bg-orange-800"
        >
          Reset
        </button>
      </div>
    </main>
  );
}
