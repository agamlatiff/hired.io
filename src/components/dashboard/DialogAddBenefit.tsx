'use client'

import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { Benefit } from "@/lib/types";

interface Props {
  updateBenefits: (item: Benefit) => void;
}

const DialogAddBenefit = ({ updateBenefits }: Props) => {
  const benefitRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSaveBenefit = () => {
    const benefit = benefitRef.current?.value;
    const description = descriptionRef.current?.value;

    if (benefit === "" || description === "") {
      return;
    }

    updateBenefits({
      benefit,
      description,
    });
  };

  return (
    <Dialog>
      <Button type="button" variant="outline">
        <PlusIcon className="size-4 mr-2" />
        Add Benefit
      </Button>
      <DialogTrigger>
        <DialogContent className="sm:max-4-[425px]">
          <DialogHeader>
            <DialogTitle>Add Benefit</DialogTitle>
            <DialogDescription>
              Make a new benefit, clicks save when your done
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 mb-5">
            <div>
              <Label htmlFor="benefit">Benefit</Label>
              <Input
                id="benefit"
                placeholder="fill your benefit..."
                ref={benefitRef}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="fill your description..."
                ref={descriptionRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveBenefit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
};

export default DialogAddBenefit;
