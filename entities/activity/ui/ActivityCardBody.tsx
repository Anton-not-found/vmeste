"use client";

import { FC } from "react";
import { IActivityCollection } from "@/shared/types/activity.types";
import { Text } from "../../../shared/components/common/Text/ui/Text";

import styles from "../styles/CardEntity.module.scss";
import { Flex, Tag } from "antd";
import dayjs from "@/lib/dayjs";
import { prepareActivityCategoryToString } from "../models/helpers/functions";

type TProps = {
  data: IActivityCollection;
};
export const ActivityCardBody: FC<TProps> = ({ data }) => {
  return (
    <div className={styles.card_body}>
      <Flex vertical gap={8}>
        <Tag style={{width: "100%"}} color="success">
          {prepareActivityCategoryToString(data.category)}
        </Tag>

        <Text type="primary" size="xl" maxLines={2} strong>
          {data.title}
        </Text>

        <div style={{ overflow: "auto", maxHeight: 100,  }}>
          <Text type="secondary" size="xs">
            {data.description}
          </Text>
        </div>
      </Flex>

      <Flex vertical gap={4}>
        <Flex align="center" justify="space-between">
          <Text strong>Начало активности:</Text>
          <Text size="xs" type="warning">
            {dayjs(data.activateOnUtc).format("D MMMM YYYY в HH:mm")}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text strong>Локация:</Text>
          <Text size="xs" type="warning">
            {data.location}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text strong>Текущее кол-во участников:</Text>
          <Text size="xs" type="warning">
            {data.currentParticipants}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text strong>Максимальное кол-во участников:</Text>
          <Text size="xs" type="warning">
            {data.maxParticipants}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};
