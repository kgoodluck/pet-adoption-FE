import React from 'react'

export default function RandomEmojis({emoji, amount, minFontSize, maxFontSize}) {

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const arrayOfCoordinates = [];

    for (let i = 0; i < amount; i++) {
        // const randomMovingValue = getRandomNumber(-10, 10);
        const randomFontSize = getRandomNumber(minFontSize, maxFontSize);
        const randomMovingValue = (maxFontSize - randomFontSize) / 9 * (Math.round(Math.random()) * 2 - 1);
        const randomLeft = getRandomNumber(0, winWidth - randomFontSize);
        const randomTop = getRandomNumber(0, winHeight - randomFontSize);
        arrayOfCoordinates.push({ 'top': randomTop, 'left': randomLeft, 'font': randomFontSize, 'movingValue': randomMovingValue});
    }

  return (
    <>
        {arrayOfCoordinates.map(div => (
            (<div key={div.top} className='random-emoji' style={{top: div.top, left: div.left, fontSize: div.font + 'px' }} data-moving-value={`${div.movingValue}`}>{emoji}</div>)
        ))}
    </>
  )
}

function getRandomNumber(min, max) {    
  return Math.random() * (max - min) + min;
}