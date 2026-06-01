"use client";

import { FC } from "react";
import { IActivityCollection } from "@/shared/types/activity.types";
import dayjs from "@/lib/dayjs";
import styles from "../styles/Card.module.scss";
import {
  ActivityCardBody,
  ActivityCardFooter,
  ActivityCardHeader,
} from "@/entities";

type TProps = {
  data: IActivityCollection;
};
export const ActivityCard: FC<TProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <ActivityCardHeader data={data} />
      <ActivityCardBody data={data} />
      <ActivityCardFooter data={data} />
    </div>
  );
};
