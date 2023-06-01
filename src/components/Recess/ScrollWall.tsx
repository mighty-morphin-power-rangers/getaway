
import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ImageList from './imagelist';
import InfiniteScroll from 'react-infinite-scroll-component';
import './scroll.css'
import { UserContext, UserContextType } from '../../App';

const ScrollWall = () => {
const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };;
const [images, setImages] = useState<any[]>([]);
const [loaded, setIsLoaded] = useState(false);
// console.log(userId)
  useEffect(() => {
    fetchImages();
  }, [userId]);

const fetchImages = (num = 10) => {
  if (!userId) {
    return;
  }

  const data = {
    googleId: userId.toString(),
    name: userName
  };

  axios.post('recommend/scroll', { data })
    .then((response) => {
      // console.log(response.data)
      setImages([...images, ...response.data]);
      setIsLoaded(true);
    });
};

  return (
    <div className="image-board" >
      <InfiniteScroll
     dataLength={images.length}
     next={() => fetchImages(5)}
     hasMore={true}
     loader={
      <img
         src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
         alt="loading"
      />}
 >
    <div className="image-grid" style={{ marginTop: "30px" }}>
    {loaded ? images.map((image, index) => <ImageList key={index} image={image.urls.regular} />) : ""}
</div>
</InfiniteScroll>
     
    </div>
  );
}
export default ScrollWall