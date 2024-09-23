import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useTheme } from '@mui/system';

interface PrimaryPopOver {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  popupId?: string;
}

function PrimaryPopOver({ anchor, open, onClose, children, popupId }: PrimaryPopOver) {
  React.useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        if (anchor && !anchor.contains(event.target as Node)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [anchor, open, onClose]);

  return (
    <BasePopup
      id={popupId}
      open={open}
      anchor={anchor}
      disablePortal
      className="z-50 rounded-lg font-sans font-medium text-sm mt-2 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100"
    >
      {children}
    </BasePopup>
  );
}

export default PrimaryPopOver;
