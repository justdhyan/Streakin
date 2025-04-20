
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DistractionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLog: (reason: string) => void;
  habitName: string;
}

const commonDistractions = [
  "Phone distraction",
  "Procrastination",
  "Too tired",
  "Netflix/TV",
  "Social media",
  "Lost track of time"
];

const DistractionDialog = ({ isOpen, onClose, onLog, habitName }: DistractionDialogProps) => {
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast({
        title: "Please enter a reason",
        description: "Understanding what distracts you helps build better habits",
      });
      return;
    }
    onLog(reason.trim());
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Info size={18} />
            What distracted you from {habitName}?
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Enter what distracted you..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full"
          />
          
          <div className="flex flex-wrap gap-2">
            {commonDistractions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setReason(d)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 
                  ${reason === d 
                    ? "bg-habit-900 text-white dark:bg-habit-300 dark:text-habit-900" 
                    : "bg-secondary hover:bg-secondary/80"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Log Distraction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DistractionDialog;
