import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Children, ReactNode } from "react";

type props = {
  optionYes: string;
  optionNo: string;
  message: string;
  yesAction: () => void | Promise<void>;
  children: ReactNode;
};

export function ConfirmAlert({
  optionYes,
  optionNo,
  message,
  yesAction,
  children,
}: props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{optionNo}</AlertDialogCancel>
          <AlertDialogAction>
            <button onClick={yesAction}> {optionYes}</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
