import React from 'react'
import Banner from '@src/assets/images/banner.jpg';
import  './index.less';

const Home: React.FC = () => {
  return <div>
    <p >Hello,This is pages!</p>
    <img src={Banner} alt="" />
  </div>
}

export default Home;
