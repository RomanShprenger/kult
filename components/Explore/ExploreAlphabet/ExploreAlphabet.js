import { useState, useEffect } from "react";
import Link from 'next/link';
import alphabet from 'data/alphabet.json';

const ExploreAlphabet = () => {
  const [grid, setGrid] = useState(null);
  const [cols, setCols] = useState(6);

  useEffect(() => {
    const createGrid = () => {
      const listOfAll = [];
      let colsCount = 6;
      let columnSize = 0;

      if (window.innerWidth < 768) {
        colsCount = 1;
      } else if (window.innerWidth < 1024) {
        colsCount = 2;
      } else if (window.innerWidth < 1280) {
        colsCount = 3;
      } else if (window.innerWidth < 1536) {
        colsCount = 4;
      } else if (window.innerWidth < 1920) {
        colsCount = 5;
      }

      // TODO: уменьшить сложность алгоритма
      Object.keys(alphabet).forEach((letter) => {
        alphabet[letter].forEach((creator, i) => {
          listOfAll.push(<div className="explore__alphabet-item" {...{ "data-letter": i === 0 ? letter.toUpperCase() : null}} key={creator.nick+i}>
            <Link href={`/user/${creator.nick}`}>
              <a className="explore__alphabet-item-link">
                {creator.name}
                <img src={creator.artwork} alt={creator.nick} className="explore__alphabet-item-img" />
              </a>
            </Link>
          </div>)
        })
      })

      columnSize = Math.ceil(listOfAll.length / colsCount);

      const result = [];

      for (let iter = 0; iter < colsCount; iter++) {
        result.push(<div className="explore__alphabet-col" key={iter}>{
          listOfAll.slice(iter*columnSize, (iter+1)*columnSize)
        }</div>)
      }

      if(cols !== colsCount) {
        setGrid(result);
        setCols(colsCount)
      };
    }

    createGrid();

    window.addEventListener("resize", createGrid);
    return () => {
      window.removeEventListener("resize", createGrid);
    };
  });

  return (
    <div className="explore__alphabet-wrapper">
      <div className="container">
        <div className="explore__alphabet">
          {grid}
        </div>
      </div>
    </div>
  )
}

export default ExploreAlphabet;
