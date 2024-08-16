import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  
 function Resizeable() {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full "
      >
        <ResizablePanel className="border" defaultSize={15}>
          <div className="flex h-screen items-center justify-center">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        {/* <ResizableHandle withHandle /> */}
        <ResizablePanel defaultSize={75} className="border-4">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
  
  export default Resizeable