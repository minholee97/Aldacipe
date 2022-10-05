import React, { useEffect, useState } from 'react';
// custom component
import CarouselRefrigerator from '../components/mainpage/CarouselRefrigerator';
import CarouselPopular from '../components/mainpage/CarouselPopular';
import CarouselSimilar from '../components/mainpage/CarouselSimilar';
import Banner from '../components/mainpage/Banner';
import { refrigeratorRecipe, userLikeRecipe, popularRecipe } from '../api/main';
// css
import classes from './MainPage.module.scss';
import { classicNameResolver } from 'typescript';
const MainPage: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [refrige, setRefrige] = useState([])
  const [userLike, setUserLike] = useState([])
  const [popular, setPopular] = useState([])

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await refrigeratorRecipe();
      // console.log(data);
      setRefrige(data);
    })();
    (async () => {
      const data = await userLikeRecipe();
      // console.log(data);
      setUserLike(data);
    })();
    (async () => {
      const data = await popularRecipe();
      // console.log(data);
      setPopular(data);
    })();

    setIsLoading(false);
  }, []);

  // test
  const refriRefresh = () => {
    setIsLoading(true);
    (async () => {
      const data = await refrigeratorRecipe();
      // console.log(data);
      setRefrige(data);
    })();
  }
  const likeRefresh = () => {
    (async () => {
      const data = await userLikeRecipe();
      // console.log(data);
      setUserLike(data);
    })();
  }
  const popularRefresh = () => {
    (async () => {
      const data = await popularRecipe();
      // console.log(data);
      setPopular(data);
    })();
  }
  return (
    <div className={classes.container}>
      <div className={classes.container_box}>
        <Banner />
        <h2 className={classes.text}>
          회원님과 입맛이 비슷한 유저가 추천하는 요리
        </h2>
        {/* <button onClick={likeRefresh}>입맛 refresh</button> */}
        <CarouselRefrigerator list={userLike}/>
        <CarouselRefrigerator list={refrige}/>
        <h2 className={classes.text}>가장 인기있는 요리</h2>
        {/* <button onClick={popularRefresh}>인기 refresh</button> */}
        <CarouselRefrigerator list={popular}/>
        <h2 className={classes.text}>냉장고 재료로 만들 수 있는 요리</h2>
        {/* <button onClick={refriRefresh}>냉장고 refresh</button> */}
      </div>
    </div>
  );
};

export default MainPage;
