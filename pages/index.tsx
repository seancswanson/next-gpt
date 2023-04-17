// App.tsx
import ChatArea from "@/components/ChatArea/ChatArea";
import TopChatBar from "@/components/ChatArea/TopChatBar";
import ConversationHistory from "@/components/Sidebar/ConversationHistory";
import FooterLinks from "@/components/Sidebar/FooterLinks";
import { Gudea } from "next/font/google";
import { useEffect, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import { useMediaQuery } from "react-responsive";
import ResizableSection from "../components/ResizableSection";

const gudea = Gudea({ weight: ["400", "700"], subsets: ["latin-ext"] });

export default function Home() {
  const [showSidebarLarge, setShowSidebarLarge] = useState(true);
  const [showSidebarSmall, setShowSidebarSmall] = useState(true);

  const [showSettings, setShowSettings] = useState(false);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // Adjust the breakpoint as needed
  const [sectionWidths, setSectionWidths] = useState<number[]>([]);

  useEffect(() => {
    setSectionWidths([0.3, 0.7]);
  }, []);

  const toggleSidebar = () => {
    setShowSidebarSmall(!showSidebarSmall);
  };

  const handleResize =
    (index: number) =>
    (event: React.SyntheticEvent<Element, Event>, data: ResizeCallbackData) => {
      const width = data.size.width;
      const totalWidth = window.innerWidth;
      const updatedWidths = [...sectionWidths];
      updatedWidths[index] = width / totalWidth;
      updatedWidths[index + 1] = 1 - updatedWidths[index];
      setSectionWidths(updatedWidths);
    };

  if (sectionWidths.length === 0) {
    return null; // Or return a loading indicator
  }

  const renderLargeScreen = () => (
    <>
      {showSidebarLarge && (
        <ResizableSection
          width={sectionWidths[0] * window.innerWidth}
          minWidth={100}
          onResize={handleResize(0)}
        >
          <div className="flex h-full flex-col bg-gray-200 p-4">
            <ConversationHistory />
            <FooterLinks />
          </div>
        </ResizableSection>
      )}
      <div
        className="flex h-full flex-col p-4"
        style={{
          width: showSidebarLarge ? `${sectionWidths[1] * 100}%` : "100%",
        }}
      >
        <button
          className="mb-2 bg-blue-500 p-2 text-white"
          onClick={() => setShowSidebarLarge(!showSidebarLarge)}
        >
          {showSidebarLarge ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        <TopChatBar
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <ChatArea showSettings={showSettings} />
      </div>
    </>
  );

  const renderSmallScreen = () => (
    <>
      {showSidebarSmall && (
        <div className="flex h-1/3 w-full flex-col bg-gray-200 p-4">
          <ConversationHistory />
          <FooterLinks />
        </div>
      )}
      <div
        className={`${
          showSidebarSmall ? "h-2/3" : "h-full"
        } flex  w-full flex-col p-4`}
      >
        <button
          className="mb-2 bg-blue-500 p-2 text-white"
          onClick={toggleSidebar}
        >
          {showSidebarSmall ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        <TopChatBar
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <ChatArea showSettings={showSettings} />
      </div>
    </>
  );

  return (
    <div
      className={`${gudea.className} h-screen flex-col overflow-hidden text-xl lg:flex lg:flex-row`}
    >
      {isLargeScreen ? renderLargeScreen() : renderSmallScreen()}
    </div>
  );
}
