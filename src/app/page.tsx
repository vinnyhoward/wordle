"use client";
import { useState, useEffect } from "react";

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

const NUM_INPUTS = 5;

const fetchWord = () => {
  const randomIndex = Math.ceil(Math.random() * dict.length);
  return dict[randomIndex];
};

const fillArr = Array.from({ length: NUM_INPUTS }).fill("");

export default function Home() {
  const [word] = useState<string>(fetchWord());
  const [row1, setRow1] = useState<any[]>(fillArr);
  const [row2, setRow2] = useState<any[]>(fillArr);
  const [row3, setRow3] = useState<any[]>(fillArr);
  const [row4, setRow4] = useState<any[]>(fillArr);
  const [row5, setRow5] = useState<any[]>(fillArr);
  const [row6, setRow6] = useState<any[]>(fillArr);

  const [isWinner, setWinner] = useState(false);
  const [isLoser, setLoser] = useState(false);

  const handleChange = (
    event: any,
    index: number,
    setFunc: any,
    state: any
  ) => {
    const value = event.target.value;
    const re = /^[A-Za-z]+$/;
    if (re.test(value)) {
      const newArray = [...state];
      newArray[index] = value.toLowerCase();
      setFunc(newArray);
    }
  };

  const getWordHashMap = () => {
    const hash: any = {};
    word.split("").forEach((letter) => {
      if (!hash[letter]) hash[letter] = 1;
      else hash[letter] += 1;
    });
    return hash;
  };

  const getStyles = (index: number, row: any) => {
    const wordHashMap = getWordHashMap();
    const correctPlace = "bg-emerald-400";
    const incorrectPlace = "bg-amber-500";
    const error = "bg-slate-500";
    let styles = "";

    const letter = row[index];
    if (row[index] !== word[index] && wordHashMap[letter] > 0) {
      wordHashMap[letter] -= 1;
      styles = incorrectPlace;
    } else if (row[index] === word[index]) {
      styles = correctPlace;
    } else if (letter !== "") {
      styles = error;
    }

    return styles;
  };

  const renderInputList1 = () => {
    return row1.map((letter: string, index: number) => {
      const styles = getStyles(index, row1);
      const isDisabled = row1.join("").length === 5;
      return (
        <input
          disabled={isDisabled}
          key={`${index}`}
          className={`border-3 m-2 border-[5px] border-gray-400 h-[100px] 
          w-[100px] text-[48px] p-[30px] rounded-xl text-white ${styles}`}
          value={letter}
          onChange={(event) => handleChange(event, index, setRow1, row1)}
          maxLength={1}
          type="text"
        />
      );
    });
  };

  const renderInputList2 = () => {
    return row2.map((letter: string, index: number) => {
      const styles = getStyles(index, row2);
      const isDisabled = row2.join("").length === 5 || row1.join("").length < 5;
      return (
        <input
          disabled={isDisabled}
          key={`${index}`}
          className={`border-3 m-2 border-[5px] border-gray-400 h-[100px] 
          w-[100px] text-[48px] p-[30px] rounded-xl text-white ${styles}`}
          value={letter}
          onChange={(event) => handleChange(event, index, setRow2, row2)}
          maxLength={1}
          type="text"
        />
      );
    });
  };

  const renderInputList3 = () => {
    return row3.map((letter: string, index: number) => {
      const styles = getStyles(index, row3);
      const isDisabled = row3.join("").length === 5 || row2.join("").length < 5;
      return (
        <input
          disabled={isDisabled}
          key={`${index}`}
          className={`border-3 m-2 border-[5px] border-gray-400 h-[100px] 
          w-[100px] text-[48px] p-[30px] rounded-xl text-white ${styles}`}
          value={letter}
          onChange={(event) => handleChange(event, index, setRow3, row3)}
          maxLength={1}
          type="text"
        />
      );
    });
  };

  const renderInputList4 = () => {
    return row4.map((letter: string, index: number) => {
      const styles = getStyles(index, row4);
      const isDisabled = row4.join("").length === 5 || row3.join("").length < 5;
      return (
        <input
          disabled={isDisabled}
          key={`${index}`}
          className={`border-3 m-2 border-[5px] border-gray-400 h-[100px] 
          w-[100px] text-[48px] p-[30px] rounded-xl text-white ${styles}`}
          value={letter}
          onChange={(event) => handleChange(event, index, setRow4, row4)}
          maxLength={1}
          type="text"
        />
      );
    });
  };

  const renderInputList5 = () => {
    return row5.map((letter: string, index: number) => {
      const styles = getStyles(index, row5);
      const isDisabled = row5.join("").length === 5 || row4.join("").length < 5;
      return (
        <input
          disabled={isDisabled}
          key={`${index}`}
          className={`border-3 m-2 border-[5px] border-gray-400 h-[100px] 
          w-[100px] text-[48px] p-[30px] rounded-xl text-white ${styles}`}
          value={letter}
          onChange={(event) => handleChange(event, index, setRow5, row5)}
          maxLength={1}
          type="text"
        />
      );
    });
  };

  const renderInputList6 = () => {
    return row6.map((letter: string, index: number) => {
      const styles = getStyles(index, row6);
      const isDisabled = row6.join("").length === 5 || row5.join("").length < 5;
      return (
        <input
          disabled={isDisabled}
          key={`${index}`}
          className={`border-3 m-2 border-[5px] border-gray-400 h-[100px] 
          w-[100px] text-[48px] p-[30px] rounded-xl text-white ${styles}`}
          value={letter}
          onChange={(event) => handleChange(event, index, setRow6, row6)}
          maxLength={1}
          type="text"
        />
      );
    });
  };

  useEffect(() => {
    const word1 = row1.join("");
    const word2 = row2.join("");
    const word3 = row3.join("");
    const word4 = row4.join("");
    const word5 = row5.join("");
    const word6 = row6.join("");
    const wordArr = [word1, word2, word3, word4, word5, word6];
    const isWinner = wordArr.filter((w: string) => w === word);
    if (isWinner.length === 1) setWinner(true);
    if (word6.length === 5 && word6 !== word) setLoser(true);
  }, [row1, row2, row3, row4, row5, row6, isWinner, setWinner, word]);

  console.log("word:", word);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto justify-center w-[750px]">
      <div className="flex flex-col mb-4">
        <div className="flex flex-row">{renderInputList1()}</div>
        <div className="flex flex-row">{renderInputList2()}</div>
        <div className="flex flex-row">{renderInputList3()}</div>
        <div className="flex flex-row">{renderInputList4()}</div>
        <div className="flex flex-row">{renderInputList5()}</div>
        <div className="flex flex-row">{renderInputList6()}</div>
      </div>
      <div className="w-full h-[75px] flex items-center justify-center">
        <span className="text-[18px] text-black">
          {isWinner && "YOU WON BITCH"}
          {isLoser && "YOU LOST BITCH"}
        </span>
      </div>
    </main>
  );
}
