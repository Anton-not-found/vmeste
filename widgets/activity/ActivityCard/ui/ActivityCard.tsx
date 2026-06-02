"use client";

import { FC } from "react";
import { IActivityCollection } from "@/shared/types/activity.types";

import styles from "../styles/Card.module.scss";
import {
  ActivityCardBody,
  ActivityCardFooter,
  ActivityCardHeader,
} from "@/entities";
import { useRootStore } from "@/stores/useRootStore";

type TProps = {
  data: IActivityCollection;
};
export const ActivityCard: FC<TProps> = ({ data }) => {
  const {auth} = useRootStore()
  console.log(auth.user, 'auth');
  
  return (
    <div className={styles.container}>
      <ActivityCardHeader data={data} />
      <ActivityCardBody data={data} />
      <ActivityCardFooter data={data} />
    </div>
  );
};
