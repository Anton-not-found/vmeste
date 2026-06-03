"use client";

import { FC } from "react";
import { HeartRegular } from "@fluentui/react-icons";
import { HeartFilled } from "@fluentui/react-icons";
import { IActivityCollection } from "@/shared/types/activity.types";
import { Text } from "../../../shared/components/common/Text/ui/Text";

import styles from "../styles/CardEntity.module.scss";
import dayjs from "@/lib/dayjs";
import { Flex } from "antd";
// import { Flex } from "@/shared/components/common";
type TProps = {
  data: IActivityCollection;
};
export const ActivityCardFooter: FC<TProps> = ({ data }) => {
  return (
    <div className={styles.container_footer}>
      <Flex vertical gap={4}>
        <Flex  align="center" justify="space-between">
          <Text strong>Начало активности:</Text>
          <Text type="warning">
            {dayjs(data.activateOnUtc).format("D MMMM YYYY в HH:mm")}
          </Text>
        </Flex>
        <Flex  align="center" justify="space-between">
          <Text strong>Локация:</Text>
          <Text type="warning">{data.location}</Text>
        </Flex>
      </Flex>

      <Flex align="center"  justify="end">
        <Flex align="center" justify="center" className={styles.icon_container}>
          {data.isFavorite ? (
            <HeartFilled className={styles.icon_favorite} fontSize={24} />
          ) : (
            <HeartRegular className={styles.icon_favorite} fontSize={24} />
          )}
        </Flex>
      </Flex>
    </div>
  );
};


