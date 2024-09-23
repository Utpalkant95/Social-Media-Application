
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"

interface IPrimaryDailog {
  children: React.ReactNode;
  isOpen: boolean;
}



export default function PrimaryDialog({children, isOpen} : IPrimaryDailog) {
  return (
    <Dialog open={isOpen}>
      <DialogContent> 
        {children}  
      </DialogContent>
    </Dialog>
  )
}
