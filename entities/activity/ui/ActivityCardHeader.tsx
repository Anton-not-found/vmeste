"use client";

import { FC } from "react";
import { IActivityCollection } from "@/shared/types/activity.types";

import styles from "../styles/CardEntity.module.scss";
import { NoImagesJpg } from "@/shared";

type TProps = {
  data: IActivityCollection;
};
export const ActivityCardHeader: FC<TProps> = ({ data }) => {
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: `url(${data.imageUrl ? data.imageUrl : NoImagesJpg.src})`,

        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
};
