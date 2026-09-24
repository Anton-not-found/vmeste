"use client";

import { FC, useMemo, useState } from "react";
import { useRootStore } from "@/stores/useRootStore";
import { ActivityCard } from "@/widgets";
import { Button, Flex, Input } from "antd";
import { AddRegular } from "@fluentui/react-icons";
import { prepareActivityCategoryToString } from "@/entities/activity/models/helpers/functions";
import { filterArrayByValues, IActivityCollection } from "@/shared";
import { CreateActivityForm } from "@/features";

type TProps = {
  activityCardList: IActivityCollection[];
};

const { Search } = Input;

export const ActivityCardList: FC<TProps> = ({ activityCardList }) => {
  const { activityCard } = useRootStore();
  const activityCardCollection = activityCard.activityCardCollection;
  const [searchValue, setSearchValue] = useState<string>("");
  const [isCreateActivity, setIsCreateActivity] = useState<boolean>(false);

  const assignmentTemplateSearchFiltered = useMemo(() => {
    return filterArrayByValues(searchValue, activityCardList, [
      { key: "title" },
      { key: "author.name" },
      { key: "description" },
      {
        key: "category",
        transformValue: (value) => prepareActivityCategoryToString(value),
      },
    ]);
  }, [activityCardList, searchValue]);

  console.log(activityCardList,'activityCardList');
  


  return (
    <Flex vertical style={{ height: "100%" }}>
      <Flex
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 24,
          height: 80,
          flexShrink: 0,
          backgroundColor: "#f6ffed",
          borderRadius: 8,
        }}
        align="center"
      >
        <Flex style={{ width: "100%" }} align="center" justify="space-between">
          <Search
            placeholder="Поиск"
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(e) => setSearchValue(e)}
            style={{ maxWidth: 300, width: "100%" }}
          />
          <Button
            onClick={() => setIsCreateActivity(true)}
            color="primary"
            variant="dashed"
            icon={
              <Flex align="center" justify="center">
                <AddRegular style={{ fontSize: 18 }} />
              </Flex>
            }
          >
            Добавить
          </Button>
        </Flex>
      </Flex>

      <Flex style={{ flex: 1, overflowY: "auto", minHeight: 0 }} wrap gap={16}>
        {assignmentTemplateSearchFiltered.map((item) => (
          <ActivityCard key={item.id} data={item} />
        ))}
      </Flex>
      {isCreateActivity && (
        <CreateActivityForm
          isOpen={isCreateActivity}
          onClose={() => setIsCreateActivity(false)}
        />
      )}
    </Flex>
  );
};
