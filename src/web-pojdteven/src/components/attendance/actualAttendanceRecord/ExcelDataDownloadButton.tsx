import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import useChildStore from '@/stores/ChildStore';
import useChild from '@/hooks/children/useChild';
import useAttendanceItemsOfChildInMonth from '@/hooks/attendance/useAttendanceItemsInMonth';
import getVisitedAttendanceItems from '@/utils/helpers/getVisitedAttendanceItems';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { FileDown } from 'lucide-react';

const ExcelFileDownloadButton = () => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const childId = useChildStore((store) => store.childId);

  const { data: child } = useChild(childId ?? '');

  const { data: attendanceItemsOfChild } = useAttendanceItemsOfChildInMonth({
    childId: childId,
    month: currentMonth.month(),
  });

  const visitedAttendance = getVisitedAttendanceItems(attendanceItemsOfChild);

  const foodTax = import.meta.env.VITE_FOOD_TAX as number;
  const foodSummaryPrice = (visitedAttendance?.length ?? 0) * foodTax;

  // Function for creating excel file
  const generateExcel = async () => {
    // Data
    const attendanceHeader = ['Datum'];
    const financialHeader = ['Školkovné', 'Stravné', 'Celkem'];
    const financialData = [
      `${child?.monthlyFee ?? 0},- Kč`,
      `${foodSummaryPrice},- Kč`,
      `${foodSummaryPrice + (child?.monthlyFee ?? 0)},- Kč`,
    ];

    // Workbook and worksheet creation
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      `${currentMonth.format('MMMM YYYY')} - ${child?.fullName}`
    );

    // Add title
    worksheet.mergeCells('A1:C1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = `${currentMonth.format('MMMM YYYY')} - ${
      child?.fullName
    }`;
    titleCell.font = { bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center' };

    // Add data
    worksheet.addRows(
      [
        [],
        attendanceHeader,
        ...(visitedAttendance?.map((att) => [dayjs(att.date).format('D. M')]) ||
          []),
        [],
        financialHeader,
        financialData,
      ],
      'border'
    );

    // Styles

    // Column width
    worksheet.columns = [{ width: 20 }, { width: 20 }, { width: 20 }];

    // Each cell must have border + add thick border to attendanceTable
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }
      // Here add border to attendanceItems table
      const isAttendenceItemRow =
        rowNumber > 3 && rowNumber <= 3 + (visitedAttendance?.length ?? 0);
      const isAttendanceItemLastRow =
        rowNumber === 3 + (visitedAttendance?.length ?? 0);

      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: isAttendenceItemRow ? 'thick' : 'thin' },
          bottom: { style: isAttendanceItemLastRow ? 'thick' : 'thin' },
          right: { style: isAttendenceItemRow ? 'thick' : 'thin' },
        };
        cell.alignment = { horizontal: 'center' };
      });
    });

    // Header must have think border
    const attendanceHeaderRow = worksheet.getRow(3);
    attendanceHeaderRow.font = { bold: true };
    attendanceHeaderRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thick' },
        bottom: { style: 'thick' },
        left: { style: 'thick' },
        right: { style: 'thick' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFBFBFBF' },
      };
    });

    // Financial table style
    const financialTableStartIndex = 5 + (visitedAttendance?.length ?? 0);
    const financialHeaderRow = worksheet.getRow(financialTableStartIndex);
    financialHeaderRow.font = { bold: true };
    financialHeaderRow.eachCell((cell, cellIndex) => {
      cell.border = {
        top: { style: 'thick' },
        bottom: { style: 'thick' },
        left: { style: cellIndex === 1 ? 'thick' : 'thin' },
        right: { style: cellIndex === 3 ? 'thick' : 'thin' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFBFBFBF' },
      };
    });
    worksheet.getRow(financialTableStartIndex + 1).eachCell(
      (cell, cellIndex) =>
        (cell.border = {
          bottom: {
            style: 'thick',
          },
          left: { style: cellIndex === 1 ? 'thick' : 'thin' },
          right: { style: cellIndex === 3 ? 'thick' : 'thin' },
        })
    );

    // File save
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(
      blob,
      `${currentMonth.format('MMMM YYYY')} - ${child?.fullName}.xlsx`
    );
  };

  return (
    <Button onClick={generateExcel} variant='outline'>
      <FileDown />
      Stáhnout Excel
    </Button>
  );
};

export default ExcelFileDownloadButton;
