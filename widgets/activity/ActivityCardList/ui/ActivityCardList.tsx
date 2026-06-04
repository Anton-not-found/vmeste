"use client";

import { prepareActivityCategoryToString } from "@/entities/activity/models/helpers/functions";
import { filterArrayByValues, IActivityCollection } from "@/shared";
import { ActivityCard } from "@/widgets";
import { Flex, Input } from "antd";
import { FC, useMemo, useState } from "react";

type TProps = {
  activityCardList: IActivityCollection[];
};

const { Search } = Input;

export const ActivityCardList: FC<TProps> = ({ activityCardList }) => {
  const [searchValue, setSearchValue] = useState<string>("");

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

  return (
    <Flex vertical style={{ height: "100%" }}>
      <Flex
        style={{
          paddingLeft: 16,
          marginBottom: 24,
          height: 80,
          flexShrink: 0,
          backgroundColor: "#f6ffed",
          borderRadius: 8,
        }}
        align="center"
      >
        <Search
          placeholder="Поиск"
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={(e) => setSearchValue(e)}
          style={{ maxWidth: 300, width: "100%" }}
        />
      </Flex>

      <Flex style={{ flex: 1, overflowY: "auto", minHeight: 0 }} wrap gap={16}>
        {assignmentTemplateSearchFiltered.map((item) => (
          <ActivityCard key={item.id} data={item} />
        ))}
      </Flex>
    </Flex>
  );
};
