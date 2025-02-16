// src/components/ui/CustomCaptionNav.tsx

import {
  addMonths,
  getMonth,
  getYear,
  setMonth,
  setYear,
  format,
} from "date-fns";
import { CaptionProps, useNavigation, useDayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Komponen shadcn/ui
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/**
 * Kustom caption yang menampilkan:
 * - Tombol prev/next
 * - Dropdown month & year (shadcn/ui menu)
 */
export function CustomCaptionNav(props: CaptionProps) {
  // Dapatkan displayMonth dari CaptionProps
  const { displayMonth } = props;

  // Dapatkan locale dari DayPicker global
  const { locale } = useDayPicker();

  // Dapatkan goToMonth dari Navigation
  const { goToMonth } = useNavigation();

  // Range year [1900..2100]
  const fromYear = 1970;
  const toYear = 2050;

  // Function: next/prev
  const handlePrevMonth = () => goToMonth(addMonths(displayMonth, -1));
  const handleNextMonth = () => goToMonth(addMonths(displayMonth, 1));

  // Month & year saat ini
  const currentMonthIndex = getMonth(displayMonth);
  const currentYear = getYear(displayMonth);

  // Daftar month [0..11]
  const months = Array.from({ length: 12 }, (_, i) => i);
  // Daftar year [1900..2100]
  const years = Array.from(
    { length: toYear - fromYear + 1 },
    (_, i) => fromYear + i
  );

  // Ubah month
  const handleSelectMonth = (m: number) => {
    goToMonth(setMonth(displayMonth, m));
  };
  // Ubah year
  const handleSelectYear = (y: number) => {
    goToMonth(setYear(displayMonth, y));
  };

  // Nama bulan & tahun
  const monthLabel = format(displayMonth, "MMMM", { locale });
  const yearLabel = format(displayMonth, "yyyy", { locale });

  return (
    <div className="flex items-center justify-center gap-2 py-1 relative">
      {/* TOMBOL PREV */}
      <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* DROPDOWN MONTH */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="px-2 text-sm w-[110px] justify-between"
          >
            {monthLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Month</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {months.map((m) => {
            // Date dummy untuk label
            const dummyDate = new Date(2021, m, 1);
            const name = format(dummyDate, "MMMM", { locale });
            return (
              <DropdownMenuItem
                key={m}
                onClick={() => handleSelectMonth(m)}
                className={m === currentMonthIndex ? "font-bold" : ""}
              >
                {name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DROPDOWN YEAR */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="px-2 text-sm w-[90px] justify-between"
          >
            {yearLabel}
          </Button>
        </DropdownMenuTrigger>
        {/* Batasi tinggi & scrollable */}
        <DropdownMenuContent className="max-h-40 overflow-y-auto">
          <DropdownMenuLabel>Select Year</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {years.map((y) => (
            <DropdownMenuItem
              key={y}
              onClick={() => handleSelectYear(y)}
              className={y === currentYear ? "font-bold" : ""}
            >
              {y}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* TOMBOL NEXT */}
      <Button variant="ghost" size="sm" onClick={handleNextMonth}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
