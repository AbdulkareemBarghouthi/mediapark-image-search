import React from "react";
import styles from "./styles.module.scss";
import { ResultsGridProps } from "./interface";

const ResultGrid: React.FC<ResultsGridProps> = ({ images }) => {
  return (
    <div className={styles.container}>
      {images?.length !== 0 ? (
        images?.map((item, index) => {
          return (
            <div className={styles["grid-item"]} key={index}>
              <img className={styles["grid-image"]} src={item?.urls?.regular} alt={item.alt_description} />
            </div>
          );
        })
      ) : (
        <p>no results for search query</p>
      )}
    </div>
  );
};

export default ResultGrid;
