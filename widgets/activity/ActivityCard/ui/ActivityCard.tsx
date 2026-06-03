"use client";

import { FC } from "react";
import { IActivityCollection } from "@/shared/types/activity.types";
import { HeartRegular } from "@fluentui/react-icons";
import { HeartFilled } from "@fluentui/react-icons";
import { Text } from "../../../../shared/components/common/Text/ui/Text";

import styles from "../styles/Card.module.scss";
import { ActivityCardBody } from "@/entities";
import { useRootStore } from "@/stores/useRootStore";
import { Button, Card, Flex } from "antd";
import { NoImagesJpg } from "@/shared";

type TProps = {
  data: IActivityCollection;
};
export const ActivityCard: FC<TProps> = ({ data }) => {
  const { auth } = useRootStore();

  return (
    <div className="activity-card-wrapper">
      <Card
        styles={{
          root: { display: "flex", flexDirection: "column" },
          body: {
            paddingTop: 8,
          },
        }}
        hoverable
        style={{ width: 360 }}
        cover={
          <img
            draggable={false}
            alt="header-card"
            src={data.imageUrl ? data.imageUrl : NoImagesJpg.src}
          />
        }
        actions={[
          <Button
            color="lime"
            variant="link"
            style={{
              width: "100%",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.author.name}
          </Button>,

          <Button
            size="middle"
            type="primary"
            variant="link"
            color="gold"
            icon={
              data.isFavorite ? (
                <HeartFilled className={styles.icon_favorite} fontSize={20} />
              ) : (
                <HeartRegular className={styles.icon_favorite} fontSize={20} />
              )
            }
          />,
        ]}
      >
        <ActivityCardBody data={data} />
      </Card>
    </div>
  );
};
