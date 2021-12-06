import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ResultsGridProps } from "./interface";
import LikeButton from "../../assets/images/like.png";
import DislikeButton from "../../assets/images/dislike.png";
import LoadingIcon from "../../assets/images/loading.gif";
import { ImageResponse } from "../../interface";
import Axios from "../../Api";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResultGrid: React.FC<ResultsGridProps> = ({ images, isUserLoggedIn, onUserLikeOrDislike }) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clickedLikeButton, setClickedLikeButton] = useState<string | number>('')

  useEffect(() => {
    setShowControls(isUserLoggedIn);
  }, [isUserLoggedIn]);

  const likePhoto = async (id: string | number) => {
    setLoading(true);
    setClickedLikeButton(id);

    try {
      await Axios.post(`/photos/${id}/like`);
      if(onUserLikeOrDislike){
        onUserLikeOrDislike();
      }
    } catch (e) {
      toast("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  const dislikePhoto = async (id: string | number) => {
    setLoading(true);
    setClickedLikeButton(id);

    try {
      await Axios.delete(`/photos/${id}/like`);
      if(onUserLikeOrDislike){
        onUserLikeOrDislike();
      }
    } catch (e) {
      toast("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  const renderLikeDislikeButton = (item: ImageResponse) => {
    if (loading && item.id === clickedLikeButton) {
      return <img src={LoadingIcon} alt={"Loading Icon"} />;
    }

    if (showControls) {
      if (item.liked_by_user) {
        return (
          <img
            onClick={() => {
              dislikePhoto(item.id);
              
            }}
            src={DislikeButton}
            alt={"Dislike Button"}
          />
        );
      } else {
        return (
          <img
            onClick={() => {
              likePhoto(item.id);
            }}
            src={LikeButton}
            alt={"Like Button"}
          />
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      {images?.length !== 0 ? (
        images?.map((item, index) => {
          return (
            <div className={styles["grid-item"]} key={index}>
              <img
                className={styles["grid-image"]}
                src={item?.urls?.regular}
                alt={item.alt_description}
              />
              {showControls && (
                <div className={styles["grid-controls"]}>
                  <div className={styles["like-dislike-button"]}>
                    {renderLikeDislikeButton(item)}
                    
                  </div>
                  <span>Likes: {item.likes}</span>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>no results for search query</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ResultGrid;
