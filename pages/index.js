
import { client } from '../lib/client';
import { HeroBanner, FooterBanner, Products } from '../components';
import React from 'react';

const Home = ({ products, bannerData }) => {

  

  return (
    <>
      
      <HeroBanner HeroBanner={bannerData.length && bannerData[0]} ></HeroBanner>
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variation</p>
      </div>

      <div className='products-container'>
        {
         products?.map(product => <Products key={product._id} product={product} />)
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} ></FooterBanner>
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  }
}



export default Home;