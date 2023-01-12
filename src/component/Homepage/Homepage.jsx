import React, { useState, useEffect } from 'react'
import "./Homepage.css"
import Spinner from "../Spinner/Spinner"

const Homepage = () => {

  const [data, setData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [filterArr, setfilterArr] = useState([]);
  const [flag, setFlag] = useState(false);
  
  const createBar = (items) => {
    let fruitData = {}
    let fruitArr = []
    items.forEach((el) => {
      if (fruitData[el.favoriteFruit]) {
        fruitData[el.favoriteFruit] = fruitData[el.favoriteFruit] + 1
      } else {
        fruitData[el.favoriteFruit] = 1
      }
    });

    Object.keys(fruitData).forEach((el) => {
      fruitArr.push({ "fruit": el, "count": fruitData[el] })
      }
    )

    fruitArr.sort((a, b) => b.count - a.count);
    setBarData(fruitArr);
  }

  const barClickHandler = (fruitName, totalCount) => {
    console.log(fruitName, " : ", totalCount);
    setFlag(true);
    let filterList = data.filter((el) => el.favoriteFruit === fruitName);
    setfilterArr(filterList);
  }

  useEffect(() => {
    function response(arr) {
      createBar(arr);
      setData(arr);
    }
    window.CustomApi.get(response);
  }, []);

  return (
    <>
      {
        data.length ? <section className='fruit-section'>
          <div className='container'>
            <h3 className='title'>Favorite Fruits</h3>
            <div className='fruit-wrapper'>
              <div className='bar-wrapper'>
                {
                  barData.map((el) =>
                    <div key={el?.fruit} className='items' onClick={() => barClickHandler(el.fruit, el?.count)}>
                      <p className='fruit'>{el?.fruit}</p>
                      <div className='bar'>
                        <p className='count'>{el?.count}</p>
                        <div className='progress' style={{ width: `${Math.round((el.count / data.length) * 100)}%`, backgroundColor: `rgb(${Math.round(Math.random() * 254)} ${Math.round(Math.random() * 254)} ${Math.round(Math.random() * 254)})` }}></div>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className='list-items'>
                {
                  (flag ? filterArr : data ).map((list, index) =>
                    <div key={index} className='list'>
                      <p>{list?.name}</p>
                      <p className='list-fruit'>{list?.favoriteFruit}</p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </section> : <Spinner />
      }
    </>
  )
}

export default Homepage;