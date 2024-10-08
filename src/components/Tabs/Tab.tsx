import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconType } from "react-icons/lib";
// Define types for the component props
interface TabItem {
  label: string;
  value: string;
  content: ReactNode;
  Icon : IconType;
}

interface TabProps {
  defaultValue: string;
  tabItems: TabItem[];
  className?: string; // Optional className prop to allow further customization
  TabsTriggerClassName?: string; // Optional className prop to allow further customization
  TabsListClassName?: string; // Optional className prop to allow further customization
}

function Tab({
  defaultValue,
  tabItems,
  className,
  TabsListClassName,
  TabsTriggerClassName,
}: TabProps) {
  const gridCols = `grid-cols-3`;
  console.log(gridCols)
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList
        className={`flex items-center justify-center gap-x-16 ${TabsListClassName}`}
      >
        {tabItems.map((tabItem) => (
          <TabsTrigger
            key={tabItem.value}
            value={tabItem.value}
            className={TabsTriggerClassName}
          >
            {tabItem.Icon && <tabItem.Icon />}
            {tabItem.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabItems.map((tabItem) => (
        <TabsContent key={tabItem.value} value={tabItem.value}>
          {tabItem.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default Tab;