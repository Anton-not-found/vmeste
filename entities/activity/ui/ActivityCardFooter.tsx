"use client";

import { FC } from "react";
import { HeartRegular } from "@fluentui/react-icons";
import { HeartFilled } from "@fluentui/react-icons";
import { IActivityCollection } from "@/shared/types/activity.types";
import { Text } from "../../../shared/components/common/Text/ui/Text";

import styles from "../styles/CardEntity.module.scss";
import dayjs from "@/lib/dayjs";
type TProps = {
  data: IActivityCollection;
};
export const ActivityCardFooter: FC<TProps> = ({ data }) => {
  return (
    <div className={styles.container_footer}>
      <div className={styles.footer}>
        <Text strong>Начало активности:</Text>
        <Text type="warning">
          {dayjs(data.activateOnUtc).format("D MMMM YYYY в HH:mm")}
        </Text>
      </div>
      <div className={styles.footer_icon}>
        <div className={styles.icon_container}>
          {data.isFavorite ? (
            <HeartFilled className={styles.icon_favorite} fontSize={20} />
          ) : (
            <HeartRegular className={styles.icon_favorite} fontSize={20} />
          )}
        </div>
      </div>
    </div>
  );
};
