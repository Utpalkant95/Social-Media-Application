import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types for the component props
interface TabItem {
  label: string;
  value: string;
  content: ReactNode;
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
  const gridCols = tabItems.length;
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList
        className={`grid w-full grid-cols-${gridCols} ${TabsListClassName}`}
      >
        {tabItems.map((tabItem) => (
          <TabsTrigger
            key={tabItem.value}
            value={tabItem.value}
            className={TabsTriggerClassName}
          >
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