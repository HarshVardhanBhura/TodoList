// "use client";

// import * as React from "react";
// import { ChevronDownIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export function Calendar24() {
//   const [open, setOpen] = React.useState(false);
//   const [date, setDate] = React.useState(undefined); // ✅ Removed TypeScript typing

//   return (
//     <div className="flex gap-4">
//       <div className="flex flex-col gap-3">
//         <Label htmlFor="date-picker" className="px-1">
//           Date
//         </Label>
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               id="date-picker"
//               className="w-32 justify-between font-normal"
//             >
//               {date ? date.toLocaleDateString() : "Select date"}
//               <ChevronDownIcon />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//             <Calendar
//               mode="single"
//               selected={date}
//               captionLayout="dropdown"
//               onSelect={(selectedDate) => {
//                 setDate(selectedDate);
//                 setOpen(false);
//               }}
//             />
//           </PopoverContent>
//         </Popover>
//       </div>
//       <div className="flex flex-col gap-3">
//         <Label htmlFor="time-picker" className="px-1">
//           Time
//         </Label>
//         <Input
//           type="time"
//           id="time-picker"
//           step="1"
//           defaultValue="10:30:00"
//           className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
//         />
//       </div>
//     </div>
//   );
// }


// "use client";

// import * as React from "react";
// import { ChevronDownIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export function Calendar24() {
//   const [open, setOpen] = React.useState(false);
//   const [date, setDate] = React.useState(undefined);

//   return (
//     <div className="flex gap-6">
//       {/* Date Picker */}
//       <div className="flex flex-col gap-2">
//         <Label htmlFor="date-picker" className="text-sm text-white/80 px-1">
//           Date
//         </Label>
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="ghost"
//               id="date-picker"
//               className="w-32 justify-between font-normal bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
//             >
//               {date ? date.toLocaleDateString() : "Select date"}
//               <ChevronDownIcon className="ml-2 h-4 w-4" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent
//             className="w-auto p-2 bg-white border border-white/10 shadow-xl rounded-xl"
//             align="start"
//           >
//             <Calendar
//               mode="single"
//               selected={date}
//               captionLayout="dropdown"
//               onSelect={(selectedDate) => {
//                 setDate(selectedDate);
//                 setOpen(false);
//               }}
//             />
//           </PopoverContent>
//         </Popover>
//       </div>

//       {/* Time Picker */}
//       <div className="flex flex-col gap-2">
//         <Label htmlFor="time-picker" className="text-sm text-white/80 px-1">
//           Time
//         </Label>
//       <div className="relative w-24">
//   <Input
//     type="time"
//     id="time-picker"
//     step="1"
//     defaultValue="10:30:00"
//     className="w-full pr-8 pl-2 bg-white/10 text-white border border-white/20 backdrop-blur-md 
//                focus:ring-2 focus:ring-indigo-500 focus:outline-none 
//             [&::-webkit-calendar-picker-indicator]:opacity-0 
//             "
//   />
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     viewBox="0 0 24 24"
//     className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60 pointer-events-none"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <path d="M12 6v6l4 2" />
//   </svg>
// </div>
//       </div>
//     </div>
//   );
// }

// components/ui/dateTime/Calendar24.jsx
"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Calendar24 = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(undefined);
  const [time, setTime] = React.useState("10:30:00");

  // This exposes the selected date and time to the parent
  React.useImperativeHandle(ref, () => ({
    getReminderDate: () => {
      if (!date || !time) return null;
      const [hh, mm, ss] = time.split(":").map(Number);
      const reminder = new Date(date);
      reminder.setHours(hh ?? 0);
      reminder.setMinutes(mm ?? 0);
      reminder.setSeconds(ss ?? 0);
      reminder.setMilliseconds(0);
      return reminder;
    }
  }));

  return (
    <div className="flex gap-6">
      {/* Date Picker */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="date-picker" className="text-sm text-white/80 px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              id="date-picker"
              className="w-32 justify-between font-normal bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-2 bg-white border border-white/10 shadow-xl rounded-xl"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="time-picker" className="text-sm text-white/80 px-1">
          Time
        </Label>
        <div className="relative w-24">
          <Input
            type="time"
            id="time-picker"
            step="1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full pr-8 pl-2 bg-white/10 text-white border border-white/20 backdrop-blur-md 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none 
              [&::-webkit-calendar-picker-indicator]:opacity-0"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60 pointer-events-none"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
      </div>
    </div>
  );
});

Calendar24.displayName = "Calendar24";
