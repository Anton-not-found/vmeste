"use client";

import { FC } from "react";
import { IActivityCollection } from "@/shared/types/activity.types";
import { Text } from "../../../shared/components/common/Text/ui/Text";

import styles from "../styles/CardEntity.module.scss";

type TProps = {
  data: IActivityCollection;
};
export const ActivityCardBody: FC<TProps> = ({ data }) => {
  return (
    <div className={styles.body}>
      <Text type="primary" size="xl" maxLines={2} strong>
        {data.title}
      </Text>

      <div style={{ overflow: "auto" }}>
        <Text type="secondary" size="xs">
          {data.description}
        </Text>
      </div>
    </div>
  );
};
